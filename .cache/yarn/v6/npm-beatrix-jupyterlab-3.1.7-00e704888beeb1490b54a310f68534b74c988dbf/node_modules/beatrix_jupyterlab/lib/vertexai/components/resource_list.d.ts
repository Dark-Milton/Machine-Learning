import * as React from 'react';
import { ItemsResponse } from '../../components/shared/paginated_list';
interface Props {
    displayItem: (resource: unknown) => React.ReactElement;
    listResources: (pageSize: number, pageToken: string) => Promise<ItemsResponse>;
    additionalActions?: React.ReactElement;
    checkMatch: (resource: unknown, filter: string) => boolean;
}
/** Component for display a list of Vertex resources with a refresh. */
export declare function ResourceList(props: Props): JSX.Element;
export {};
