import { Deserializable } from './deserializable.model';

export class Lecture implements Deserializable {
  id: string;
  title: string;
  type: string;
  videoUrl: string;
  duration: number;
  text: string;
  isFree: boolean;

  deserialize(input: any) {
    Object.assign(this, input);
    this.id = input._id;
    return this;
  }
}
