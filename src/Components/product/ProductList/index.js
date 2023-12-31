import React, { useEffect, useState } from "react";
import "./productList.scss";
import Loader from "../../../Components/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import SearchFilter from "../../SearchFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_FILTER_PRODUCT,
  selectFilteredProducts,
} from "../../../redux/features/product/searchFilterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");

  //access state
  const dispatch = useDispatch();
  const filteredProduct = useSelector(selectFilteredProducts);

  //text shortener... place it in utility folder later
  const shortenText = (text, n) => {
    if (text.length > n) {
      const reducedText = text.substring(0, n).concat("...");
      return reducedText;
    }
    return text;
  };

  //delete product function
  const delProduct = async (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
    dispatch(getProducts());
  };

  //confirm alert --utility folder
  const confirmDelete = (id, name) => {
    confirmAlert({
      title: `Delete Product- ${name}`,
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          //onClick: () => alert("Click No"),
        },
      ],
    });
  };

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProduct.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProduct.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProduct]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProduct.length;
    setItemOffset(newOffset);
  };
  // End Pagination

  useEffect(() => {
    dispatch(SEARCH_FILTER_PRODUCT({ products, search }));
  }, [search, dispatch, products]);
  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <SearchFilter
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <Loader />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>--No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category ? category : ""}</td>
                      <td>
                        {"$"}
                        {price ? Number(price) : 0}
                      </td>
                      <td>{quantity ? Number(quantity) : 0}</td>
                      <td>
                        {"$"}
                        {Number(price) * Number(quantity)}
                      </td>
                      <td className="icons">
                        <span>
                          {" "}
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={20} color="purple" />
                          </Link>
                        </span>
                        <span>
                          {" "}
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color="green" />
                          </Link>
                        </span>
                        <span>
                          {" "}
                          <FaTrashAlt
                            size={20}
                            color="red"
                            onClick={() => confirmDelete(_id, name)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
