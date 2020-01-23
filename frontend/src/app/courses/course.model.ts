export class Course {
  public id: string;
  public title: string;
  public subtitle: string;
  public description: string;
  public imageUrl: string;
  public rating: number;
  public price: number;
  public sections: [];

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
