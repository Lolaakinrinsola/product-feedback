import { create } from "zustand";
import data from "./data.json";
import { toast } from 'react-toastify';

const currentUser = data.currentUser;
const productRequest = data.productRequests;

const useStore = create((set, get) => ({
  user: currentUser,
  upvotedProducts: [],
  freshRequest: productRequest,
  productRequest: productRequest,
  board: ["All", "UI", "UX", "Enhancement", "Bug", "Feature"],
  status: ["Suggestion", "Planned", "In-Progress", "Live"],
  sort:['Most Upvotes','Least Upvotes','Most Comments','Least Comments'],
  selectedSort: 'Most Upvotes',
  selectedCommentId: null,
  roadmap: [],
  selectedBoard: "All",
  // Sort product requests based on the selected option
  setSelectedSort: (sortOption) => {
    set({ selectedSort: sortOption });
    const sortedRequests = get().sortProductRequests(sortOption);
    set({ productRequest: sortedRequests });
  },

  toggleUpvote: (id) => {
    const freshRequest = get().freshRequest; // current list of product requests
    const upvotedProducts = get().upvotedProducts; // list of upvoted product IDs
    
    // Find the product with the given ID in the freshRequest list
    const productIndex = freshRequest.findIndex((product) => product.id === id);
    
    // If the product is not found, exit early
    if (productIndex === -1) return;
  
    const product = freshRequest[productIndex]; // The product to toggle upvote for
  
    let updatedProduct;
    // Check if this product is already upvoted by the user
    if (upvotedProducts.includes(id)) {
      // If it's already upvoted, decrease upvotes by 1 and remove from the upvoted list
      updatedProduct = { ...product, upvotes: product.upvotes - 1 };
      const updatedUpvotedProducts = upvotedProducts.filter((productId) => productId !== id);
      set({
        upvotedProducts: updatedUpvotedProducts, 
        productRequest: freshRequest.map((p, idx) => idx === productIndex ? updatedProduct : p)
      });
    } else {
      // If it's not upvoted yet, increase upvotes by 1 and add to the upvoted list
      updatedProduct = { ...product, upvotes: product.upvotes + 1 };
      const updatedUpvotedProducts = [...upvotedProducts, id];
      set({
        upvotedProducts: updatedUpvotedProducts,
        productRequest: freshRequest.map((p, idx) => idx === productIndex ? updatedProduct : p)
      });
    }
  },
  
  
  

  // Sort function that applies the selected sort option
  sortProductRequests: (sortOption) => {
    const productRequests = get().productRequest;
    switch (sortOption) {
      case 'Most Upvotes':
        return [...productRequests].sort((a, b) => b.upvotes - a.upvotes);
      case 'Least Upvotes':
        return [...productRequests].sort((a, b) => a.upvotes - b.upvotes);
      case 'Most Comments':
        return [...productRequests].sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
      case 'Least Comments':
        return [...productRequests].sort((a, b) => (a.comments?.length || 0) - (b.comments?.length || 0));
      default:
        return productRequests; // If no sort option, return the original order
    }
  },
  setSelectedCommentId: (id) => set({ selectedCommentId: id }), 
  resetSelectedCommentId: () => set({ selectedCommentId: null }),
  setSelectedBoard: (board) => {
    const freshRequest = get().freshRequest;
    set({ selectedBoard: board });
    let filteredRequests = [];

    if (board === "All") {
      filteredRequests = freshRequest;
    } else {
      filteredRequests = freshRequest.filter((request) => {
        return (
          request.category &&
          request.category.toLowerCase() === board.toLowerCase()
        );
      });
    }
    set({ productRequest: filteredRequests }); 
    const roadmap = generateRoadmap(filteredRequests);
    set({ roadmap });
  },

  //I want to be able to upvote a suggestion ,that is adding +1 to the upvotes then if clicked again it would -1
  
  setRoadmap: () => {
    const roadmap = generateRoadmap(get().productRequest);
    set({ roadmap });
  },

  updateProductRequest: (id, updatedData) => {
    const updatedRequests = get().freshRequest.map((product) => {
      if (product.id === id) {
        return { ...product, ...updatedData };
      }
      return product;
    });
    set({ productRequest: updatedRequests, freshRequest: updatedRequests });
    toast.success(` Suggestion edited successfully!`)

  },
  addProductRequest: (data) => {
    const freshRequests = get().freshRequest
    const newProductRequest=[...freshRequests,{...data,status:'suggestion',id:freshRequests.length+1,upvotes: 0,}]
    set({ productRequest: newProductRequest, freshRequest: newProductRequest });
    toast.success(` Suggestion added successfully!`)
  },
  deleteProductRequest: (id) => {
    // Filter out the product request with the given ID
    const updatedRequests = get().freshRequest.filter((product) => product.id !== id);
  
    // Update the state with the filtered list
    set({ productRequest: updatedRequests, freshRequest: updatedRequests });
    toast.success(` Suggestion deleted successfully!`)

  },
  

addCommentOrReply: (productId, replyContent, replyingToCommentId = null, replyingToReplyId = null) => {
  const productRequests = get().freshRequest; // Get the current product requests

  const updatedProductRequests = productRequests.map((product) => {
    if (product.id === productId) {
      // Ensure that the comments array is initialized (if undefined or null)
      const comments = product.comments || [];  // If comments is undefined, default to an empty array

      // If replying to a comment (not a reply to a reply)
      if (replyingToCommentId && !replyingToReplyId) {
        const updatedComments = comments.map((comment) => {
          if (comment.id === replyingToCommentId) {
            const newReply = {
              content: replyContent,
              replyingTo: comment.user.username,  // Replying to this comment's author
              user: {
                image: get().user.image,
                name: get().user.name,
                username: get().user.username,
              },
            };
            return { ...comment, replies: [...(comment.replies || []), newReply] };
          }
          return comment;
        });
        return { ...product, comments: updatedComments };
      }

      // If replying to a reply (nested reply)
      if (replyingToCommentId && replyingToReplyId) {
        const updatedComments = comments.map((comment) => {
          if (comment.id === replyingToCommentId) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply.id === replyingToReplyId) {
                const newReplyToReply = {
                  content: replyContent,
                  replyingTo: reply.user.username,  // Replying to this reply's author
                  user: {
                    image: get().user.image,
                    name: get().user.name,
                    username: get().user.username,
                  },
                };
                return { ...reply, replies: [...(reply.replies || []), newReplyToReply] };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });
        return { ...product, comments: updatedComments };
      }

      // If no reply, adding a new comment
      const newComment = {
        id: comments.length + 1 || 1, // Simple ID generation, you might want a more robust approach
        content: replyContent,
        user: {
          image: get().user.image,
          name: get().user.name,
          username: get().user.username,
        },
      };
      return { ...product, comments: [...comments, newComment] };
    }
    return product;
  });

  set({ productRequest: updatedProductRequests, freshRequest: updatedProductRequests });  // Update the productRequests state
},

}));

export default useStore;

export const generateRoadmap = (productRequests) => {
  // Define the roadmap structure with status types and colors

  const roadmap = [
    { color: "bg-orange", text: "Planned", number: 0 },
    { color: "bg-lightpurple", text: "In-Progress", number: 0 },
    { color: "bg-lightBlue", text: "Live", number: 0 },
    { color: "bg-grey", text: "Suggestion", number: 0 }, // Add other statuses as needed
  ];

  // Iterate over product requests and count the occurrences of each status
  productRequests.forEach((request) => {
    const status = request.status;
    // console.log(status)
    const roadmapItem = roadmap.find(
      (item) => item.text.toLowerCase() === status.toLowerCase()
    );

    if (roadmapItem) {
      roadmapItem.number += 1; // Increment the count for the matching status
    }
  });

  return roadmap;
};
