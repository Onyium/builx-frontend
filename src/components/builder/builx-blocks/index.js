// src/builx-blocks/index.js

import { saludoBlock } from './saludoBlock';
import { catalogoBlock } from './catalogoBlock';
import { contactoBlock } from './contactoBlock';
import { testimoniosBlock } from './testimoniosBlock';
import { faqBlock } from './faqBlock';
import { footerBlock } from './footerBlock';
import { navbarBlock } from './navbarBlock';
import { textoLibreBlock } from '../builx-blocks/textoLibreBlock'; // Ajusta la ruta si es necesario
import { redesSocialesBlock } from '../builx-blocks/redesSocialesBlock';
import { serviciosBlock } from './serviciosBlock';
import { galeriaBlock } from './galeriaBlock';
import { bannerPromoBlock } from './bannerPromoBlock';
import { formularioLeadsBlock } from './formularioLeadsBlock';


export const todosLosBloques = [
  navbarBlock,
  saludoBlock,
  catalogoBlock,
  contactoBlock,
  testimoniosBlock,
  faqBlock,
  footerBlock,
  textoLibreBlock,
  redesSocialesBlock,
  serviciosBlock,
  galeriaBlock,
  bannerPromoBlock,
  formularioLeadsBlock
];