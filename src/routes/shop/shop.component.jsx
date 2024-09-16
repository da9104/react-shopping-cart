import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CategoriesPreview from '../categories-preview/categories-preview'
import Category from '../../routes/category/Category'
import { CategoriesProvider } from '../../contexts/categories.context'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/category.action'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments('categories')
            console.log(categoriesArray)
            dispatch(setCategories(categoriesArray))
        }
        getCategoriesMap()
    }, [])

   return(
    <CategoriesProvider>
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    </CategoriesProvider>
    )
}

export default Shop