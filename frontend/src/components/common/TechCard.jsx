import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";



export function TechCard({ name, img_src, ai_url, desc }) {

    const redirectToURL = (url) => {
        // Perform redirection here

        window.open(url, "_blank");
    };
    return (
        <Card className="mt-6 w-96 cursor-pointer" onClick={() => { redirectToURL(ai_url) }}>
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src={img_src}
                    alt="card-imajuhjbge"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {name}
                </Typography>
                <Typography>
                    {desc}
                </Typography>
            </CardBody>

        </Card>
    );
}