export default function mapBook(b) {
  return {
    id: b.id,
    title: b.title,
    coverImage: b.coverUrl || null,
    publishYear: b.editionYear || null,
    description: b.summary || '',
    excerpt: b.extractUrl || null,
    category: b.category?.label || '',
    author: b.author ? `${b.author.firstname} ${b.author.lastname}` : '',
    userId: b.user_id ?? b.userId ?? null,
    reviews: (b.reviews || []).map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      userId: r.user_id ?? r.userId,
    })),
    createdAt: b.created_at ?? b.createdAt,
    updatedAt: b.updated_at ?? b.updatedAt,
    raw: b,
  }
}
