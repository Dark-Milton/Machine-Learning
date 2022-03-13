/// <reference types="react" />
import { PublishedNotebook } from '../types';
interface PublishedListItemProps {
    publishedNotebook: PublishedNotebook;
    handleDoDelete: () => void;
}
/** List item for a published Notebook */
export declare function PublishedListItem({ publishedNotebook, handleDoDelete, }: PublishedListItemProps): JSX.Element;
export {};
