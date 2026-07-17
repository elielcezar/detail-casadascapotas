/**
 * Fotos da galeria em grade filtrável por categoria (Gallery2 — modelo em
 * teste ao lado do carrossel atual). Cada categoria corresponde a uma pasta
 * em public/img/galeria/<slug>/. Para adicionar fotos, coloque o arquivo na
 * pasta certa e acrescente a entrada correspondente aqui (width/height são
 * as dimensões reais do arquivo). Para remover uma foto, apague o arquivo
 * E a entrada correspondente aqui — os dois precisam ficar em sincronia,
 * já que esta lista não é gerada automaticamente a partir da pasta.
 */

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface GalleryCategory {
  slug: string;
  label: string;
  photos: GalleryPhoto[];
}

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "controle-solar",
    label: "Controle Solar",
    photos: [
      { src: "/img/galeria/controle-solar/controle-solar-02.jpg", width: 1200, height: 583, alt: "Controle Solar — foto 1" },
    ],
  },
  {
    slug: "envelopamento",
    label: "Envelopamento",
    photos: [
      { src: "/img/galeria/envelopamento/envelopamento-03.jpg", width: 1200, height: 800, alt: "Envelopamento — foto 1" },
      { src: "/img/galeria/envelopamento/envelopamento-05.jpg", width: 1200, height: 2133, alt: "Envelopamento — foto 2" },
      { src: "/img/galeria/envelopamento/envelopamento-06.jpg", width: 1200, height: 2133, alt: "Envelopamento — foto 3" },
      { src: "/img/galeria/envelopamento/envelopamento-12.jpg", width: 1200, height: 800, alt: "Envelopamento — foto 4" },
      { src: "/img/galeria/envelopamento/envelopamento-20.jpg", width: 1200, height: 1800, alt: "Envelopamento — foto 5" },
    ],
  },
  {
    slug: "estetica",
    label: "Estética",
    photos: [
      { src: "/img/galeria/estetica/estetica-01.jpg", width: 1200, height: 1600, alt: "Estética — foto 1" },
      { src: "/img/galeria/estetica/estetica-02.jpg", width: 1200, height: 1600, alt: "Estética — foto 2" },
      { src: "/img/galeria/estetica/estetica-03.jpg", width: 1200, height: 1600, alt: "Estética — foto 3" },
      { src: "/img/galeria/estetica/estetica-04.jpg", width: 1200, height: 1800, alt: "Estética — foto 4" },
      { src: "/img/galeria/estetica/estetica-05.jpg", width: 1200, height: 1800, alt: "Estética — foto 5" },
      { src: "/img/galeria/estetica/estetica-06.jpg", width: 1200, height: 800, alt: "Estética — foto 6" },
      { src: "/img/galeria/estetica/estetica-10.jpg", width: 1200, height: 1800, alt: "Estética — foto 7" },
    ],
  },
  {
    slug: "pickups",
    label: "Pickups",
    photos: [
      { src: "/img/galeria/pickups/pickups-01.jpg", width: 1200, height: 2133, alt: "Pickups — foto 1" },
      { src: "/img/galeria/pickups/pickups-06.jpg", width: 1200, height: 2133, alt: "Pickups — foto 2" },
      { src: "/img/galeria/pickups/pickups-08.jpg", width: 1200, height: 1800, alt: "Pickups — foto 3" },
      { src: "/img/galeria/pickups/pickups-09.jpg", width: 1200, height: 800, alt: "Pickups — foto 4" },
      { src: "/img/galeria/pickups/pickups-10.jpg", width: 1200, height: 1800, alt: "Pickups — foto 5" },
      { src: "/img/galeria/pickups/pickups-11.jpg", width: 1200, height: 800, alt: "Pickups — foto 6" },
      { src: "/img/galeria/pickups/pickups-14.jpg", width: 1200, height: 1800, alt: "Pickups — foto 7" },
      { src: "/img/galeria/pickups/pickups-17.jpg", width: 1200, height: 800, alt: "Pickups — foto 8" },
      { src: "/img/galeria/pickups/pickups-18.jpg", width: 1200, height: 800, alt: "Pickups — foto 9" },
      { src: "/img/galeria/pickups/pickups-19.jpg", width: 1200, height: 800, alt: "Pickups — foto 10" },
      { src: "/img/galeria/pickups/pickups-20.jpg", width: 1200, height: 800, alt: "Pickups — foto 11" },
      { src: "/img/galeria/pickups/pickups-22.jpg", width: 1200, height: 800, alt: "Pickups — foto 12" },
      { src: "/img/galeria/pickups/pickups-23.jpg", width: 1200, height: 800, alt: "Pickups — foto 13" },
    ],
  },
  {
    slug: "ppf",
    label: "PPF",
    photos: [
      { src: "/img/galeria/ppf/ppf-04.jpg", width: 1200, height: 800, alt: "PPF — foto 1" },
      { src: "/img/galeria/ppf/ppf-05.jpg", width: 1200, height: 2133, alt: "PPF — foto 2" },
      { src: "/img/galeria/ppf/ppf-06.jpg", width: 1200, height: 2133, alt: "PPF — foto 3" },
      { src: "/img/galeria/ppf/ppf-11.jpg", width: 1200, height: 2133, alt: "PPF — foto 4" },
      { src: "/img/galeria/ppf/ppf-13.jpg", width: 1200, height: 1800, alt: "PPF — foto 5" },
      { src: "/img/galeria/ppf/ppf-15.jpg", width: 1200, height: 800, alt: "PPF — foto 6" },
      { src: "/img/galeria/ppf/ppf-17.jpg", width: 1200, height: 1800, alt: "PPF — foto 7" },
      { src: "/img/galeria/ppf/ppf-18.jpg", width: 1200, height: 1800, alt: "PPF — foto 8" },
      { src: "/img/galeria/ppf/ppf-19.jpg", width: 1200, height: 1800, alt: "PPF — foto 9" },
    ],
  },
  {
    slug: "supercarros",
    label: "Supercarros",
    photos: [
      { src: "/img/galeria/supercarros/supercarros-01.jpg", width: 1200, height: 1424, alt: "Supercarros — foto 1" },
      { src: "/img/galeria/supercarros/supercarros-05.jpg", width: 1200, height: 1800, alt: "Supercarros — foto 2" },
      { src: "/img/galeria/supercarros/supercarros-06.jpg", width: 1200, height: 1802, alt: "Supercarros — foto 3" },
      { src: "/img/galeria/supercarros/supercarros-07.jpg", width: 1200, height: 1800, alt: "Supercarros — foto 4" },
      { src: "/img/galeria/supercarros/supercarros-08.jpg", width: 1200, height: 1800, alt: "Supercarros — foto 5" },
      { src: "/img/galeria/supercarros/supercarros-09.jpg", width: 1200, height: 800, alt: "Supercarros — foto 6" },
      { src: "/img/galeria/supercarros/supercarros-10.jpg", width: 1200, height: 1800, alt: "Supercarros — foto 7" },
      { src: "/img/galeria/supercarros/supercarros-11.jpg", width: 1200, height: 1802, alt: "Supercarros — foto 8" },
      { src: "/img/galeria/supercarros/supercarros-12.jpg", width: 1200, height: 1802, alt: "Supercarros — foto 9" },
      { src: "/img/galeria/supercarros/supercarros-13.jpg", width: 1200, height: 799, alt: "Supercarros — foto 10" },
      { src: "/img/galeria/supercarros/supercarros-15.jpg", width: 1200, height: 1800, alt: "Supercarros — foto 11" },
      { src: "/img/galeria/supercarros/supercarros-16.jpg", width: 1200, height: 800, alt: "Supercarros — foto 12" },
      { src: "/img/galeria/supercarros/supercarros-19.jpg", width: 1200, height: 1802, alt: "Supercarros — foto 13" },
      { src: "/img/galeria/supercarros/supercarros-23.jpg", width: 1200, height: 799, alt: "Supercarros — foto 14" },
      { src: "/img/galeria/supercarros/supercarros-26.jpg", width: 1200, height: 799, alt: "Supercarros — foto 15" },
      { src: "/img/galeria/supercarros/supercarros-27.jpg", width: 1200, height: 800, alt: "Supercarros — foto 16" },
      { src: "/img/galeria/supercarros/supercarros-29.jpg", width: 1200, height: 799, alt: "Supercarros — foto 17" },
      { src: "/img/galeria/supercarros/supercarros-31.jpg", width: 1200, height: 799, alt: "Supercarros — foto 18" },
      { src: "/img/galeria/supercarros/supercarros-32.jpg", width: 1200, height: 799, alt: "Supercarros — foto 19" },
      { src: "/img/galeria/supercarros/supercarros-33.jpg", width: 1200, height: 799, alt: "Supercarros — foto 20" },
      { src: "/img/galeria/supercarros/supercarros-35.jpg", width: 1200, height: 799, alt: "Supercarros — foto 21" },
    ],
  },
  {
    slug: "suvs",
    label: "SUVs",
    photos: [
      { src: "/img/galeria/suvs/suvs-01.jpg", width: 1200, height: 1800, alt: "SUVs — foto 1" },
      { src: "/img/galeria/suvs/suvs-02.jpg", width: 1200, height: 1800, alt: "SUVs — foto 2" },
      { src: "/img/galeria/suvs/suvs-03.jpg", width: 1200, height: 800, alt: "SUVs — foto 3" },
      { src: "/img/galeria/suvs/suvs-04.jpg", width: 1200, height: 800, alt: "SUVs — foto 4" },
      { src: "/img/galeria/suvs/suvs-05.jpg", width: 1200, height: 1800, alt: "SUVs — foto 5" },
      { src: "/img/galeria/suvs/suvs-06.jpg", width: 1200, height: 1800, alt: "SUVs — foto 6" },
      { src: "/img/galeria/suvs/suvs-07.jpg", width: 1200, height: 800, alt: "SUVs — foto 7" },
      { src: "/img/galeria/suvs/suvs-08.jpg", width: 1200, height: 800, alt: "SUVs — foto 8" },
      { src: "/img/galeria/suvs/suvs-09.jpg", width: 1200, height: 1800, alt: "SUVs — foto 9" },
      { src: "/img/galeria/suvs/suvs-10.jpg", width: 1200, height: 1800, alt: "SUVs — foto 10" },
      { src: "/img/galeria/suvs/suvs-11.jpg", width: 1200, height: 800, alt: "SUVs — foto 11" },
      { src: "/img/galeria/suvs/suvs-12.jpg", width: 1200, height: 800, alt: "SUVs — foto 12" },
    ],
  },
];
