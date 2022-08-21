import { getChangePageChildAction, getDeletePageChildAction,getChangeSchemaAction,getChangePageAttributeAction } from '../store/action'
import { useDispatch, useSelector } from "react-redux"

export const useSchemaData = (index) => {
    const dispatch = useDispatch();

    const pageChild = useSelector((state) => state.common.schema.children?.[index] || {});
    const schema = useSelector((state) => state.common.schema);
    
    const changePageChild = (temp) => {
        dispatch(getChangePageChildAction(index, temp));
    }
    const changeSchema = (schema) => {
        dispatch(getChangeSchemaAction(schema))
    }
    const removePageChild = () => {
        dispatch(getDeletePageChildAction(index));
    }
    const changePageAttribute = (key, value) => {
        dispatch(getChangePageAttributeAction(key, value));
    }

    return { schema, pageChild, changePageChild, changePageAttribute, changeSchema, removePageChild };
}