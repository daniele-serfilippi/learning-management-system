import { Deserializable } from './deserializable.model';
import { Section } from './section.model';

export class Course implements Deserializable {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  rating: number;
  price: number;
  sections: Section[];

  deserialize(input: any) {
    Object.assign(this, input);
    this.id = input._id;
    this.sections = input.sections ? input.sections.map(section => new Section().deserialize(section)) : new Section();
    return this;
  }
}
