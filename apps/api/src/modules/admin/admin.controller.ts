import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import {
  CreateCategorySchema,
  CreateLessonSchema,
  PaginationSchema,
  UpdateLessonSchema,
  UpsertQuizSchema,
} from "@muscle-mind/types";
import { randomUUID } from "crypto";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { Roles } from "../../common/decorators";
import { ZodValidationPipe } from "../../common/zod-validation.pipe";
import { PrismaService } from "../../prisma/prisma.service";
import { CategoriesService } from "../categories/categories.service";
import { LessonsService } from "../lessons/lessons.service";
import { QuizzesService } from "../quizzes/quizzes.service";

const UPLOAD_DIR = join(process.cwd(), "uploads");
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

@ApiTags("admin")
@ApiBearerAuth()
@Roles("ADMIN")
@Controller("admin")
export class AdminController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lessons: LessonsService,
    private readonly quizzes: QuizzesService,
    private readonly categories: CategoriesService,
  ) {}

  @Get("stats")
  async stats() {
    const [users, lessons, published, completions, quizResults] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.lesson.count(),
        this.prisma.lesson.count({ where: { status: "PUBLISHED" } }),
        this.prisma.lessonProgress.count({
          where: { status: "COMPLETED" },
        }),
        this.prisma.quizResult.count(),
      ]);

    return { users, lessons, published, completions, quizResults };
  }

  @Get("categories")
  listCategories() {
    return this.categories.listAll();
  }

  @Post("categories")
  createCategory(
    @Body(new ZodValidationPipe(CreateCategorySchema)) body: unknown,
  ) {
    return this.prisma.category.create({ data: body as never });
  }

  @Get("lessons")
  listLessons(
    @Query(new ZodValidationPipe(PaginationSchema)) pagination: unknown,
    @Query("categoryId") categoryId?: string,
    @Query("status") status?: string,
  ) {
    const p = pagination as { page: number; limit: number };
    return this.lessons.adminList({
      page: p.page,
      limit: p.limit,
      categoryId,
      status,
    });
  }

  @Get("lessons/:id")
  getLesson(@Param("id") id: string) {
    return this.lessons.adminGet(id);
  }

  @Post("lessons")
  createLesson(
    @Body(new ZodValidationPipe(CreateLessonSchema)) body: unknown,
  ) {
    return this.lessons.adminCreate(body as never);
  }

  @Patch("lessons/:id")
  updateLesson(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(UpdateLessonSchema)) body: unknown,
  ) {
    return this.lessons.adminUpdate(id, body as never);
  }

  @Delete("lessons/:id")
  deleteLesson(@Param("id") id: string) {
    return this.lessons.adminDelete(id);
  }

  @Post("quizzes")
  upsertQuiz(@Body(new ZodValidationPipe(UpsertQuizSchema)) body: unknown) {
    return this.quizzes.adminUpsert(body as never);
  }

  @Post("uploads")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
      required: ["file"],
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          ensureUploadDir();
          cb(null, UPLOAD_DIR);
        },
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase() || ".jpg";
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
          cb(
            new BadRequestException(
              "Image JPEG, PNG, WebP ou GIF uniquement",
            ) as Error,
            false,
          );
          return;
        }
        cb(null, true);
      },
    }),
  )
  uploadImage(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException("Fichier requis");
    return { url: `/uploads/${file.filename}` };
  }
}
