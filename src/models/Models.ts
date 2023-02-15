import { PrismaClient } from "@prisma/client"


export const UsersModels = new PrismaClient().users
export const ProductModels = new PrismaClient().product
export const AdminModels = new PrismaClient().admin
export const ProductCategoryModels = new PrismaClient().product_Category
export const ProductRatingModels = new PrismaClient().product_Rating
export const ShopModels = new PrismaClient().shop
export const ShopRatingModels = new PrismaClient().shop_Rating
export const EventModels = new PrismaClient().event
export const EventPostsModels = new PrismaClient().event_Posts
export const EventPostsLikesModels = new PrismaClient().event_Post_Like
export const MainBannerModels = new PrismaClient().main_Banner


