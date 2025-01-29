import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import axios from "axios";  // Import Axios
import "./search.css";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import moment from "moment";

const ScholarshipList = ({ scholarships, loading }) => {
  const [wishlist, setWishlist] = useState([]);
  let { userToken, roleId } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/${roleId}/wishlist`);
      setWishlist(data);
      console.log("wishlist:", data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("No scholarships in wishlist or server error");
        setWishlist([]); // Set empty array for display
      } else {
        console.error("Error fetching wishlist:", error);
        setError("Failed to fetch wishlist. Please try again later.");
      }
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (roleId) {
      fetchWishlist();
    }
  }, [roleId]);

  const handleWishlistToggle = async (scholarshipId) => {
    // Check if the scholarship ID is in the wishlist
    const isInWishlist = wishlist.includes(scholarshipId);

    // Show confirmation dialog
    const confirmResult = await Swal.fire({
      title: `Are you sure?`,
      text: isInWishlist
        ? 'Do you want to remove this scholarship from your wishlist?'
        : 'Do you want to add this scholarship to your wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: isInWishlist ? 'Yes, remove it!' : 'Yes, add it!',
      cancelButtonText: 'Cancel',
    });

    if (confirmResult.isConfirmed) {
      try {
        // Define the endpoint based on the action (add or remove)
        const action = isInWishlist ? 'delete' : 'add';
        const endpoint = `${import.meta.env.VITE_BASE_URL}/api/v1/students/wishlist/${scholarshipId}/${action}`;

        // Configuration for the request
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`, // Ensure `userToken` is valid
          },
        };

        // Make the API call
        const response = await axios.put(endpoint, {}, config);

        if (response.status === 200) {
          // Update the wishlist state optimistically
          setWishlist((prevWishlist) =>
            isInWishlist
              ? prevWishlist.filter((id) => id !== scholarshipId) // Remove the ID
              : [...prevWishlist, scholarshipId] // Add the ID
          );

          // Show success toast notification
          toast.success(
            `Scholarship successfully ${isInWishlist ? 'removed from' : 'added to'
            } the wishlist!`,
            {
              position: 'top-right',
              autoClose: true,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );

          await fetchWishlist();
        } else {
          toast.error('Something went wrong. Please try again.', {
            position: 'bottom-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } catch (error) {
        // Log and notify the user of errors
        console.error('Error toggling wishlist item:', error);
        if (error.status === 401) {
          toast.error('You need to log in to your account to add scholarships to your wishlist.', {
            position: 'bottom-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
        else {
          toast.error('An error occurred. Please check your connection and try again.', {
            position: 'bottom-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      }
    } else {
      Swal.fire('Cancelled', 'No changes were made to your wishlist.', 'info');
    }
  };


  return (
    <div className="list-container">
      {loading ? (
        Array.from(new Array(3)).map((_, index) => (
          <Card key={index} className="scholarship-item">
            <Skeleton variant="text" height={40} width="60%" />
            <Skeleton variant="rounded" height={200} />
            <CardContent>
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="text" height={20} width="50%" />
              <Skeleton variant="text" height={20} width="60%" />
              <Skeleton variant="text" height={20} width="70%" />
              <Skeleton variant="text" height={20} width="50%" />
            </CardContent>
          </Card>
        ))
      ) : scholarships.length === 0 ? (
        <Typography>No scholarships found</Typography>
      ) : (
        scholarships.map((scholarship) => (
          <Card key={scholarship._id} className="scholarship-item">
            <h2 className="card-header" style={{ color: "#000", marginBottom: '15px', textAlign: 'center' }}>
              {scholarship.scholarsip_name}
            </h2>
            <CardMedia
              component="img"
              height="200px"
              image={scholarship.scholarship_picture}
              alt={scholarship.scholarsip_name}
              loading="lazy"
              sx={{ borderRadius: '12px' }}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {scholarship.brief_descrition}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Language of Study: {scholarship.language_Of_Study}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Place of Study: {scholarship.Place_of_Study}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Deadline:{moment(scholarship?.deadline).format('DD MMMM YYYY')}
                <span>
                  {scholarship.number_of_seats_available <= 0 || !moment().startOf('day').isSameOrBefore(moment(scholarship.deadline).startOf('day')) ? (
                    <span style={{ color:'#721c24' , marginLeft:'10px',fontWeight:'bold',backgroundColor:'#f8d7da',padding:'5px',borderRadius:'8px' }}>closed</span>
                  ) : ''}
                </span>
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Expenses Covered: {scholarship.expenses_coverd}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label={
                  wishlist.includes(scholarship._id)
                    ? "remove from favorites"
                    : "add to favorites"
                }
                onClick={() => handleWishlistToggle(scholarship._id)}
              >
                <FavoriteIcon
                  color={wishlist.includes(scholarship._id) ? "error" : "disabled"}
                />
              </IconButton>
              <Link
                to={`/scholarship-detail/${scholarship._id}`}
                className="details-scholarship-link"
              >
                View Details
              </Link>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
};

export default ScholarshipList;
