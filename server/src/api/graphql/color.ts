import { Field, Float, InputType, ObjectType } from "type-graphql";
import { Color } from "../../lighting/color";

@InputType()
export class InputColor {
  @Field({ nullable: true })
  x?: number;
  @Field({ nullable: true })
  y?: number;
  @Field({ nullable: true })
  z?: number;

  @Field({ nullable: true })
  r?: number;
  @Field({ nullable: true })
  g?: number;
  @Field({ nullable: true })
  b?: number;

  @Field({ nullable: true })
  h?: number;
  @Field({ nullable: true })
  s?: number;
  @Field({ nullable: true })
  v?: number;

  @Field({ nullable: true })
  ct?: number;
}

@ObjectType("Color")
export class ColorValue {
  color: Color;

  rgb?: number[];
  hsv?: number[];

  constructor(color: Color) {
    this.color = color;
  }

  @Field(() => Float)
  x() {
    return this.color.x;
  }
  @Field(() => Float)
  y() {
    return this.color.y;
  }
  @Field(() => Float)
  z() {
    return this.color.z;
  }

  @Field(() => Float)
  r() {
    if (this.rgb === undefined) {
      this.rgb = this.color.toRGB();
    }
    return this.rgb[0];
  }
  @Field(() => Float)
  g() {
    if (this.rgb === undefined) {
      this.rgb = this.color.toRGB();
    }
    return this.rgb[1];
  }
  @Field(() => Float)
  b() {
    if (this.rgb === undefined) {
      this.rgb = this.color.toRGB();
    }
    return this.rgb[2];
  }

  @Field(() => Float)
  h() {
    if (this.hsv === undefined) {
      this.hsv = this.color.toHSV();
    }
    return this.hsv[0];
  }
  @Field(() => Float)
  s() {
    if (this.hsv === undefined) {
      this.hsv = this.color.toHSV();
    }
    return this.hsv[1];
  }
  @Field(() => Float)
  v() {
    if (this.hsv === undefined) {
      this.hsv = this.color.toHSV();
    }
    return this.hsv[2];
  }
}
