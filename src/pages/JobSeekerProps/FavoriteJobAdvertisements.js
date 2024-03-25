import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Grid, Image } from 'semantic-ui-react'
import { UserContext } from '../../contexts/UserProvider';
import FavoriteJobAdvertisementService from '../../services/favoriteJobAdvertisementService'
import JobAdvertisementService from '../../services/jobAdvertisementService'
import { Link, useNavigate } from 'react-router-dom';

export default function FavoriteJobAdvertisements() {

    const { user } = useContext(UserContext);
    const [favoriteJobAdvertisements, setFavoriteJobAdvertisements] = useState([]);
    const [jobSeeker, setJobSeeker] = useState([])
    const navigate = useNavigate();

    let favoriteJobAdvertisementService = new FavoriteJobAdvertisementService();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await favoriteJobAdvertisementService.getByJobSeekerId(user?.data?.id).then((result) => setFavoriteJobAdvertisements(result.data.data));
                setJobSeeker(response.data);
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

    const handleDelete = async (id) => {
        console.log(id);
        await favoriteJobAdvertisementService.deleteFavoriteJobAdvetisement(id);
    }

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        {favoriteJobAdvertisements.map((favoriteJobAdvertisement) =>
                            <Card.Group itemsPerRow={2}>
                                <Card key={favoriteJobAdvertisement.id}>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                        />
                                        <Card.Header>{favoriteJobAdvertisement.advertisementName}</Card.Header>
                                        <Card.Meta>{favoriteJobAdvertisement.city}</Card.Meta>
                                        <Card.Description>
                                            <strong>{favoriteJobAdvertisement.companyName}</strong>
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button inverted color='red' onClick={() => navigate(`/advertisement/${favoriteJobAdvertisement.advertisementId}`)}>
                                                View
                                            </Button>
                                            <Button
                                                inverted
                                                color="red"
                                                onClick={() => handleDelete(favoriteJobAdvertisement.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Container >
    )
}
