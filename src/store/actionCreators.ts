import * as actionTypes from "./actionTypes";

export function addArticle(article: IArticle) {
    const action: ArticleAction = {
        type: actionTypes.ADD_ARTICLE,
        article: article
    }
    // return simulateHttpRequest(action)
    return action
}


export function simulateHttpRequest(action: ArticleAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}