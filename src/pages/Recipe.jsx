import {Link, useParams} from "react-router-dom"
import {useGetARecipe} from "../hooks/useGetARecipe"
import {toast} from "react-toastify"
import {useEffect, useState} from "react"
import Navbar from "../components/Navbar"
import {useDeletedRecipe} from "../hooks/useDeletedRecipe"
import Footer from "../components/Footer"

function Recipe() {
  const {deleteRecipe, loading} = useDeletedRecipe()

  const [recipe, setRecipe] = useState(null)
  const {id} = useParams()
  const {getRecipe} = useGetARecipe()

  useEffect(() => {
    getRecipe("recipes", id)
      .then((data) => setRecipe(data))
      .catch((error) => toast.error(error))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="max-container flex-1">
        {!recipe && (
          <div className="flex justify-center items-center h-full mt-[300px]">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
        {recipe && (
          <div className="mt-[30px] p-5 rounded-[14px] shadow-2xl max-container h-auto p-[15px">
            <img
              className="w-[475px] h-[470px] rounded-[12px] max-lg:w-[300px] max-lg:h-64 hidden max-lg:block max-lg:mx-auto max-[1023px]:ml-6 max-[639px]:ml-0"
              src={recipe.imagesUrl[0]}
              alt=""
            />
            <div className="flex max-lg:justify-center">
              <img
                className="w-[475px] h-[470px] rounded-[12px] max-lg:hidden"
                src={recipe.imagesUrl[0]}
                alt=""
              />
              <div className="block">
                <h1 className="text-[50px]  sm:ml-6 font-bold max-sm:text-[25px]">
                  {recipe.title}
                </h1>

                <p className="font-bold  text-[18px] sm:ml-6 mt-6 sm:text-[15px]">
                  Ingredients:{" "}
                  {recipe.ingredientss.map((ing, index, ingArray) => {
                    return (
                      <span key={ing} className="font-normal  text-sm ">
                        {ing}
                        {index === ingArray.length - 1 ? "." : ", "}
                      </span>
                    )
                  })}
                </p>
                <p className=" font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px]">
                  Method:{" "}
                  <span className="font-normal  text-sm">{recipe.method}</span>
                </p>
                <p className=" font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px]">
                  Cooking Time:{" "}
                  <span className=" text-[14px] font-normal">
                    {recipe.cookingTime + " minutes"}
                  </span>
                </p>
              </div>

              <Link to="/" className="btn btn-primary self-end ml-auto ">
                Home
              </Link>
            </div>
          </div>
        )}
        {recipe && (
          <div className="flex justify-center h-full mb-[100%]">
            {!loading && (
              <button
                onClick={() => deleteRecipe("recipes", id)}
                className="btn btn-error w-3/4 mt-4 "
              >
                Delete Item
              </button>
            )}
            {loading && (
              <button
                disabled
                onClick={() => deleteRecipe("recipes", id)}
                className="btn btn-error w-3/4 mt-4"
              >
                <span className="loading loading-dots loading-lg"></span>
              </button>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Recipe
