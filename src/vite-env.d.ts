/// <reference types="vite/client" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.scss';
declare module '*.md' {
  const content: string;
  export default content;
}
