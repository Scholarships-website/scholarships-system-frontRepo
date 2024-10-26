
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { Box, TextField } from '@mui/material'; // Importing Box and TextField from MUI

// const ScholarshipList = ({ scholarships }) => {
//     return (
//         <Box mt={2} display="flex" flexDirection="column" alignItems="center">
//             {scholarships.length === 0 ? (
//                 <Typography>No scholarships found</Typography>
//             ) : (
//                 scholarships.map((scholarship) => (
//                     <Card key={scholarship.id} sx={{ maxWidth: 345, mb: 2 }}>
//                         <CardHeader
//                             title={scholarship.name} // Assuming scholarships have a 'name' property
//                         />
//                         <CardMedia
//                             component="img"
//                             height="194"
//                             image={scholarship.imageUrl} // Update this based on your scholarship data structure
//                             alt={scholarship.name}
//                         />
//                         <CardContent>
//                             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                                 {scholarship.description} {/* Assuming scholarships have a 'description' property */}
//                             </Typography>
//                         </CardContent>
//                         <CardActions disableSpacing>
//                             <IconButton aria-label="add to favorites">
//                                 <FavoriteIcon />
//                             </IconButton>
//                             {/* You can add more actions here if needed */}
//                         </CardActions>
//                     </Card>
//                 ))
//             )}
//         </Box>
//     );
// };

// export default ScholarshipList;