export default interface Course {
  code: string;
  name: string;
  description: string;
  faculty: string;
  department: string;
  prerequisites: string;
  exclusions: string;
  level: number;
  campus: string;
  term: number;
  breadth1: number;
  breadth2?: number;
}
