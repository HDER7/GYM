import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
    return (
        <div className="bg-gray-100 p-8">
            <header>
                <h1 className="text-3xl font-bold text-center mb-4">¡Bienvenido a GYMFLASH!</h1>
            </header>
            <section className="text-lg text-center mb-6">
                <p>
                    GYMFLASH es tu lugar para alcanzar tus metas de fitness y bienestar. Ofrecemos una variedad de clases, equipos de última generación y entrenadores calificados.
                </p>
            </section>
            <div className="max-w-screen-md mx-auto">
                <Carousel showThumbs={false} infiniteLoop autoPlay>
                    <div>
                        <img src="https://hips.hearstapps.com/hmg-prod/images/bench-press-workout-royalty-free-image-612720004-1553694708.jpg?crop=1xw:0.87181xh;center,top&resize=1200:*" alt="Gimnasio 1" />
                        <p className="legend">Bienvenido a GYMFLASH</p>
                    </div>
                    <div>
                        <img src="https://media.revistagq.com/photos/5f7ddbde78c4dd5b8fdf24da/4:3/w_959,h_719,c_limit/gimnasios-discotecas-nueva-normalidad.jpg" alt="Gimnasio 2" />
                        <p className="legend">Variedad de clases disponibles</p>
                    </div>
                    <div>
                        <img src="https://www.superprof.co/blog/wp-content/uploads/2019/10/getty-images-b00b-pidw4u-unsplash.jpg" alt="Gimnasio 3" />
                        <p className="legend">Equipos de última generación</p>
                    </div>
                    <div>
                        <img src="https://www.infobae.com/new-resizer/uIrJ_eE49ubsYibkfNHE0JC1w-w=/992x606/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/04/13112609/DSC_6278.jpg" alt="Gimnasio 4" />
                        <p className="legend">Entrenadores calificados</p>
                    </div>
                </Carousel>
            </div>
            <section className="text-lg mt-8">
                <h2 className="text-2xl font-bold mb-2">Información Adicional</h2>
                <p>• Abierto todos los días de la semana para adaptarse a tu horario.</p>
                <p>• Amplias áreas de entrenamiento y salas de clases.</p>
                <p>• Programas personalizados de entrenamiento.</p>
                <p>• Zona de relajación y recuperación.</p>
                <p>• Miembros de todas las edades y niveles de condición física son bienvenidos.</p>
            </section>

            <section className="text-lg mt-8">
                <h2 className="text-2xl font-bold mb-2">Horario</h2>
                <p>Lunes a Viernes: 8:00 AM - 10:00 PM</p>
                <p>Sábados: 9:00 AM - 9:00 PM</p>
                <p>Cerrado los domingos</p>
            </section>
        </div>
    );
}

export default Home;
