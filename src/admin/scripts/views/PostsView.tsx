import React from 'react';

import { Posts } from '../modules/Posts';
import { ViewLayout } from '../components';

const PostsView = () => (
    <ViewLayout
        name="Posts"
        children={<Posts />}
    />
);

export default PostsView;
