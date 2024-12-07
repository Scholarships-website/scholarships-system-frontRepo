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

const ScholarshipList = ({ scholarships, loading }) => {
    const [wishlist, setWishlist] = useState({}); // Track wishlist state for scholarships
    let { userToken, roleId } = useContext(UserContext);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    
    // const fetchWishlist = async () => {
    //     setLoader(true);
    //     setError(null);
    //     try {
    //         const { data } = await axios.get(`http://localhost:3000/api/v1/students/${roleId}/wishlist`, {
    //             headers: {
    //                 Authorization: `Bearer ${userToken}`,
    //             },
    //         });
    //         setWishlist(data);
    //         console.log("wishlist:", data);
    //     } catch (error) {
    //         if (error.response && error.response.status === 404) {
    //             console.log("No scholarships in wishlist");
    //             setWishlist([]); // Set empty wishlist
    //         } else {
    //             console.error("Error fetching wishlist:", error);
    //             setError("Failed to fetch wishlist. Please try again later.");
    //         }
    //     } finally {
    //         setLoader(false);
    //     }
    // };

    const handleWishlistToggle = async (scholarshipId) => {
        const isInWishlist = wishlist.some((item) => item.id === scholarshipId);
    
        try {
            const endpoint = `http://localhost:3000/api/v1/students/wishlist/${scholarshipId}/${isInWishlist ? "delete" : "add"}`;
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.put(endpoint, {}, config);
            if (response.status === 200) {
                // Optimistically update the state
                setWishlist((prev) =>
                    isInWishlist
                        ? prev.filter((item) => item.id !== scholarshipId)
                        : [...prev, { id: scholarshipId }] // Adjust structure to match API response
                );
                alert(
                    `Scholarship ${isInWishlist ? "removed from" : "added to"} the Wishlist successfully!`
                );
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please check your connection and try again.");
        }
    };
    // useEffect(() => {
    //     if (roleId && userToken) {
    //         fetchWishlist();
    //     } else {
    //         console.warn("Missing roleId or userToken");
    //     }
    // }, [roleId, userToken]);
    return (
        <div className="list-container">
                    {loader && <p>Loading wishlist...</p>}

            {loading ? (
                Array.from(new Array(3)).map((_, index) => (
                    <Card key={index} className="scholarship-item">
                        <Skeleton variant="text" height={40} width="60%" />
                        <Skeleton variant="rectangular" height={200} />
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
                        <h2 className="card-header" style={{ color: "#418447" }}>
                            {scholarship.scholarsip_name}
                        </h2>
                        <CardMedia
                            component="img"
                            height="200px"
                            image={scholarship.scholarship_picture}
                            alt={scholarship.scholarsip_name}
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
                                End date:{" "}
                                {new Date(scholarship.End_Date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Expenses Covered: {scholarship.expenses_coverd}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label={
                                    wishlist[scholarship._id]
                                        ? "remove from favorites"
                                        : "add to favorites"
                                }
                                onClick={() => handleWishlistToggle(scholarship._id)}
                            >
                                <FavoriteIcon
                                    color={wishlist[scholarship._id] ? "error" : "disabled"}
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
