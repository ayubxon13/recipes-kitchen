import {useEffect, useRef, useState} from "react"
import Navbar from "../components/Navbar"
import {useAddRecipes} from "../hooks/useAddRecipes"
import {useNavigate} from "react-router-dom"
import Loader from "../components/Loader"
import {useGlobalContext} from "../hooks/useGlobalContext"
import {toast} from "react-toastify"
import Footer from "../components/Footer"

function Create() {
  const [render, setRender] = useState(0)
  const [ingredientss, setingredientss] = useState([])
  const [imagesUrl, setImagesUrl] = useState([])
  const {user} = useGlobalContext()
  const navigate = useNavigate()
  const {addNewDoc, newRecipe} = useAddRecipes()
  const [loading, setLoading] = useState(false)

  const title = useRef()
  const ingredients = useRef()
  const cookingTime = useRef()
  const images = useRef()
  const method = useRef()

  const handleClick = () => {
    if (
      title.current.value.length > 0 &&
      ingredientss.length > 0 &&
      imagesUrl.length > 0 &&
      cookingTime.current.value.length > 0 &&
      method.current.value.length > 0
    ) {
      document.getElementById("my_modal_4").showModal()
    } else {
      toast.error("fill out the form")
    }

    setRender((prev) => {
      return prev + 1
    })
  }
  const handleIng = (e) => {
    e.preventDefault()
    let newing = ingredients.current.value.trim()
    if (!ingredientss.includes(newing) && newing.length > 0) {
      setingredientss((prev) => {
        return [...prev, newing]
      })
    } else if (newing) {
      toast.error(newing + " ago added")
    } else {
      toast.error("fill out the form")
    }

    ingredients.current.value = ""
  }
  const handleForm = async (e) => {
    e.preventDefault()

    if (
      title.current.value.length > 0 &&
      ingredientss.length > 0 &&
      imagesUrl.length > 0 &&
      cookingTime.current.value.length > 0 &&
      method.current.value.length > 0
    ) {
      setLoading(true)

      await addNewDoc("recipes", {
        title: title.current.value,
        ingredientss,
        cookingTime: cookingTime.current.value,
        imagesUrl,
        method: method.current.value,
        uid: user.uid,
        createdDate: new Date().toLocaleString(),
      })
      navigate("/")
      setLoading(false)
    } else {
      toast.error("fill out the form")
    }
  }
  const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg|JPEG|JPG|GIF|PNG|SVG)$/
  const handleImage = (e) => {
    e.preventDefault()
    let newImage = images.current.value.trim()
    if (imageUrlRegex.test(newImage)) {
      toast.success("Image added")
      setImagesUrl((prev) => {
        return [...prev, newImage]
      })
    } else {
      toast.error("Only in jpeg, jpg, gif, png, svg format")
    }
    images.current.value = ""
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="max-container ">
        <div className="mx-auto max-w-xl py-10">
          <h2 className="mb-5 text-center text-2xl font-semibold capitalize">
            Add new recipe
          </h2>
          <form onSubmit={handleForm} className="gap-3">
            <label className="items-start">
              <span className="mb-1 font-semibold">Title:</span>
              <input
                className="input input-bordered input-md w-full"
                ref={title}
                required
                name="title"
                type="text"
                placeholder="Type here"
              />
            </label>
            <br />
            <br />
            <label className="items-start">
              <span className="mb-1 font-semibold">Ingredients:</span>
              <div className="flex">
                <input
                  className="input input-bordered input-md w-full"
                  ref={ingredients}
                  name="title"
                  placeholder="Type here"
                />
                <button
                  type="button"
                  onClick={handleIng}
                  className="btn btn-primary ml-2"
                >
                  Add
                </button>
              </div>
              <p className="text-[16px]">
                Ingredients:{" "}
                {ingredientss.length > 0 &&
                  ingredientss.map((ing, index, ingArray) => {
                    return (
                      <span key={ing} className="text-[14px]">
                        {ing}
                        {index === ingArray.length - 1 ? "." : `, `}
                      </span>
                    )
                  })}
              </p>
            </label>
            <label className="items-start">
              <br />
              <span className="mb-1 font-semibold">Cooking Time:</span>
              <input
                className="input input-bordered input-md w-full"
                ref={cookingTime}
                required
                name="cookingTime"
                type="number"
                placeholder="Type here"
              />
            </label>
            <label className="items-start">
              <br />
              <span className="mb-1 font-semibold">ImageURL:</span>
              <div className="flex">
                <input
                  className="input input-bordered input-md w-full"
                  ref={images}
                  name="images"
                  type="text"
                  placeholder="Type here"
                />
                <button
                  onClick={handleImage}
                  type="button"
                  className="btn btn-primary ml-3"
                >
                  Add
                </button>
              </div>
              <p>Images:</p>
              <div className="grid gap-4 grid-cols-4">
                {imagesUrl.length > 0 &&
                  imagesUrl.map((image) => {
                    return (
                      <img
                        className="w-full h-full"
                        key={image}
                        src={image}
                        alt=""
                      />
                    )
                  })}
              </div>
            </label>
            <br />
            <p className="font-bold text-[20px]">Method:</p>
            <textarea
              ref={method}
              required
              name="method"
              className="textarea textarea-bordered w-full"
              placeholder="Bio"
            ></textarea>

            <div className="justify-between flex mt-2">
              {!loading && (
                <button type="submit" className="btn btn-primary w-1/3">
                  CREATE
                </button>
              )}
              {loading && (
                <button disabled className="btn btn-primary w-1/3">
                  <span className="loading loading-dots loading-md"></span>
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary w-1/3"
                onClick={handleClick}
              >
                PREVIEW
              </button>
            </div>
            <dialog id="my_modal_4" className="modal">
              <div className="w-11/12 max-w-5xl">
                <div className="p-5 bg-white rounded-[14px] shadow-2xl max-container h-auto p-[15px">
                  <img
                    className="w-[475px] h-[470px] rounded-[12px] max-lg:w-[300px] max-lg:h-64 hidden max-lg:block max-lg:mx-auto max-[1023px]:ml-6 max-[639px]:ml-0"
                    src={imagesUrl[0]}
                    alt=""
                  />
                  <div className="flex max-lg:justify-center max-lg:block">
                    <img
                      className="w-[475px] h-[470px]  rounded-[12px] max-lg:hidden"
                      src={imagesUrl[0]}
                      alt=""
                    />
                    <div className="block">
                      <h1 className="text-black text-[50px] sm:ml-6 font-bold max-sm:text-[25px]">
                        {title.current?.value}
                      </h1>

                      <p className="text-black font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px]">
                        Ingredients:{" "}
                        {ingredientss.map((ing, index, ingArray) => {
                          return (
                            <span key={ing} className="font-normal text-[15px]">
                              {ing}
                              {index === ingArray.length - 1 ? "." : ", "}
                            </span>
                          )
                        })}
                      </p>
                      <p className="text-black font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px]">
                        Method:
                        <span className="font-normal text-black text-sm flex">
                          {method.current?.value}
                        </span>
                      </p>
                      <p className="text-black font-bold text-[18px] sm:ml-6 mt-6 sm:text-[15px] max-sm:text-[15px]">
                        Cooking Time:{" "}
                        <span className="text-slate-600 text-[14px] font-normal">
                          {cookingTime.current?.value + " minutes"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">ClOSE</button>
                    </form>
                  </div>
                </div>
              </div>
            </dialog>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Create
