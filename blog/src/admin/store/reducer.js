import { produce, original } from 'immer'
import { 
    CHANGE_SCHEMA, ADD_PAGE_CHILDREN, CHANGE_PAGE_CHILD, 
    DELETE_PAGE_CHILD, CHANGE_PAGE_CHILD_POSITION,CHANGE_PAGE_ATTRIBUTE
} from './constant'

const initialSchema = {
    name: 'Page',
    attributes: {},
    children: []
};

const defaultState = {
    schema: initialSchema
}

const reducer = (state = defaultState, action) => produce(state, (draft) => {
    switch(action.type) {
        case CHANGE_SCHEMA:
            draft.schema = action.value;
            break;
        case ADD_PAGE_CHILDREN:
            draft.schema.children.push(action.value);
            break;
        case CHANGE_PAGE_CHILD:
            draft.schema.children.splice(action.index,1,action.value);
            break;
        case DELETE_PAGE_CHILD:
            draft.schema.children.splice(action.index, 1);
            break;
        case CHANGE_PAGE_CHILD_POSITION:
            const copy = original(draft.schema.children);
            draft.schema.children.splice(action.oldIndex, 1);
            draft.schema.children.splice(action.newIndex, 0, copy[action.oldIndex]);
            break;
        case CHANGE_PAGE_ATTRIBUTE:
            draft.schema.attributes[action.key] = action.value;
            break;
        default:
            break;
    }
}) 

export default reducer;