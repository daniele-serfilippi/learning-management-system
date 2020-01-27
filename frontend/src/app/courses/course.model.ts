export class Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  rating: number;
  price: number;
  sections: [];

  constructor(
    title: string,
    subtitle: string,
    description: string,
    imageUrl: string,
    rating: number,
    price: number,
    sections: [],
    id?: string
  ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.imageUrl = imageUrl;
    this.rating = rating;
    this.price = price;
    this.sections = sections;
  }
}
