export interface CoursePartProps {
  name: string;
  exerciseCount: number;
}
export interface NameProps {
  name: string;
}

// *  9.15 *  //
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface coursePartDescribable extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends coursePartDescribable {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends coursePartDescribable {
  backgroundMaterial: string;
  kind: 'background';
}
interface CoursePartSpecial extends coursePartDescribable {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
