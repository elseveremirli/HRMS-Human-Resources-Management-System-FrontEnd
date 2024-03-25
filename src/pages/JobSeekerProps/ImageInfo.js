import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Grid, Image } from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserProvider';
import ImageService from '../../services/imageService'

export default function ImageInfo() {

    const { user } = useContext(UserContext)
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [jobSeeker, setJobSeeker] = useState([])
    const [imageUrl, setImageUrl] = useState('');

    let imageService = new ImageService()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await imageService.getByJobSeekerId(user?.data?.id);
                const selectedFile = response.data.data;
                setSelectedFile(selectedFile);

                const fetchedImageUrl = selectedFile.url;
                setImageUrl(fetchedImageUrl);
            } catch (error) {
                console.log(error);
            }
        };

        const userId = user?.data?.id;

        if (userId) {
            fetchUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.data?.id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        // Dosya önizlemesini oluştur
        const reader = new FileReader();
        reader.onload = () => {
            setUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const initialValues = {
        url: selectedFile,
        userId: (user?.data?.id),
    }

    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            await imageService.addImage({
                url: selectedFile,
                userId: (user?.data?.id),
            });
            resetForm();
        } catch (error) {
            console.error(error);
        }
    };


    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
    });


    return (
        <Container>
            <Grid columns={2}>
                <Grid.Row >
                    <Grid.Column>
                        {imageUrl && (
                            <Image src={imageUrl} size='medium' circular />
                        )}
                    </Grid.Column>
                    <Grid.Column>
                        <Form>
                            <Form.Field>
                                <label>Choose a File</label>
                                <input type="file" onChange={handleFileChange} />
                            </Form.Field>
                            {url && (
                                <Form.Field>
                                    <Image src={url} size="small" rounded centered />
                                </Form.Field>
                            )}
                            <Button inverted color="red" onClick={formik.handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

