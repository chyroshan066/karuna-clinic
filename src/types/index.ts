interface Id {
    id?: number;
}

interface ImgSrc {
    imgSrc: string;
}

interface Name {
    name: string;
}

interface Text {
    text: string;
}

interface Href {
    href: string;
}

interface IonIcon {
    ionIconName: string;
    ionIconLink: string;
}

interface Title {
    title: string;
}

interface Source {
    src: string;
}

interface Alt {
    alt: string;
}

export interface Services extends Id, ImgSrc, Name, Text, Href {
    // id?: number;
}


export interface Doctors extends ImgSrc, Name {
    ionIcon: IonIcon[];
}

export interface Link extends Name, Href {}

export interface Testimonial extends Id, Name, Text {
    // id: number;
    rating: number;
    image: string;
    position?: string;
}

export interface Photo extends Id, Title, Source, Alt {
    // id: number;
}

export interface MediaItem extends Id, Title, Source, Alt {
//   id: number;
  type: 'image' | 'video';
  poster?: string; // Optional thumbnail for videos
}

export interface Article extends Title, ImgSrc, Href{
    id?: string;
    author: string;
    date: string;
    category: string;
    keywords: string[];
    content: {
        introduction?: string;
        sections: {
            title: string;
            content: string;
            items?: string[];
            highlights?: string[];
        }[];
        conclusion?: string;
    };
}