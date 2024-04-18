import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    // Проверка на аутентификацию пользователя
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true, // Убедитесь, что курс опубликован
      }
    });

    // Проверка на существование курса
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Проверка на уже существующую запись пользователя на курс
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        }
      }
    });

    if (existingPurchase) {
      // Если пользователь уже зарегистрирован на курс
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?already_enrolled=1`);
    }

    // Регистрация пользователя на курс
    await db.purchase.create({
      data: {
        courseId: params.courseId,
        userId: user.id,
      }
    });

    // Перенаправление пользователя на страницу курса с успехом
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`);
  } catch (error) {
    console.error("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
