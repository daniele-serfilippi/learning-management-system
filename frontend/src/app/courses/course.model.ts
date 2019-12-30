export class Course {
  public title: string;
  public subtitle: string;
  public description: string;
  public imageUrl: string;
  public rating: number;
  public price: number;

  constructor(
    title: string,
    subtitle: string,
    description: string,
    imageUrl: string,
    rating: number,
    price: number,
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.imageUrl = imageUrl;
    this.rating = rating;
    this.price = price;
  }
}
