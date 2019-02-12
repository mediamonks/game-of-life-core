import { Field } from './Field';

export interface Renderer {
  onInit(field: Field): void;
  onRender(): void;
}
