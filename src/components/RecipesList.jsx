import {FaClock} from "react-icons/fa6"
import {Link} from "react-router-dom"
import {isPassed24Hours} from "../utils/isPassed24Hours"

function RecipesList({recipes}) {
  console.log(recipes.length)
  return (
    <div>
      {recipes.length ? (
        <h1 className="text-[40px] mb-6 flex font-medium justify-center mt-6">
          All Recipes:
        </h1>
      ) : (
        <Link
          to={"/create"}
          className="text-[40px] hover:underline hover:text-[#3570bd] font-medium mb-6 flex justify-center mt-6"
        >
          Please create recipes !
        </Link>
      )}

      <div className="grid grid-cols-4 gap-x-4 max-[1050px]:grid-cols-3 max-[870px]:grid-cols-2 max-[480px]:grid-cols-1">
        {recipes.map((recipe) => {
          return (
            <div
              key={recipe.id}
              className="card flex card-compact shadow-xl mb-4 max-w-[260px] h-auto max-[480px]:justify-self-center max-[480px]:w-[245px] "
            >
              <img
                className="w-full h-[200px] rounded-t-[16px] max-[500px]:h-[160px] max-[480px]:h-[190px]"
                src={recipe.imagesUrl[0]}
              />
              <div className="card-body">
                <div className="flex items-center">
                  <h2 className="grid-cols-2 card-title ">{recipe.title}</h2>
                  {!isPassed24Hours(recipe.createdDate) && (
                    <span className="badge badge-secondary ml-3">!New</span>
                  )}
                </div>
                <div className="flex">
                  <p className="flex items-center gap-1 ">
                    <FaClock />
                    {recipe.cookingTime + "minutes"}
                  </p>
                </div>
                <p className=" line-clamp-3 max-[500px]:line-clamp-2">
                  {recipe.method}
                </p>
                <div className="card-actions justify-end p-1">
                  <Link
                    className="btn btn-sm btn-primary"
                    to={`/recipe/${recipe.id}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecipesList
