import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    body: string;
    text: string;
    toggleBorder: string;
    background: string;
    accent: string;
    cardBackground: string;
    cardBorder: string;
    iconColor: string;
  }
}
