import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ProductCard({ image, title, brand, price }) {
  return (
    <Card
      sx={{
        backgroundColor: "#b1b1b1ff",
        maxWidth: 500,
        fontFamily: "'Cinzel', serif", // Set Cinzel font
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          alt={title}
          sx={{
            objectFit: 'cover',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: 500 }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Brand: {brand}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: '#000000ff', mt: 1 }}
          >
            €{price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
