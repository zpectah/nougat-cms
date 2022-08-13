import React from 'react';
import {
    List as MuiList,
    ListItem,
    ListItemText,
    ListProps as MuiListProps,
    ListItemTextProps,
} from '@mui/material';

export type ListItemProps = {
    key?: string,
} & ListItemTextProps

type ListBaseProps = {
    items: ListItemProps[],
}
export type ListProps = ListBaseProps & MuiListProps

const List = (props: ListProps) => {
    const {
        items = [],
        ...rest
    } = props;

    return (
        <MuiList
            {...rest}
        >
            {items.map((item, index) => {
                const { key, ...rest } = item;

                return (
                    <ListItem
                        key={key || index}
                    >
                        <ListItemText
                            {...rest}
                        />
                    </ListItem>
                );
            })}
        </MuiList>
    );
};

export default List;
