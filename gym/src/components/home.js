import React from 'react'; 
const Home = () => {
    return (
        <div className="bg-gray-100 p-8">
          <header>
            <h1 className="text-3xl font-bold text-center mb-4">¡Bienvenido a GYMFLASH!</h1>
          </header>
          <section className="text-lg text-center mb-6">
            <p>
              Ofrecemos una variedad de clases y equipos de última generación para ayudarte a alcanzar tus metas de fitness.
            </p>
          <div className="mt-8 flex justify-center">
            <img
              src="https://media.revistagq.com/photos/5f7ddbde78c4dd5b8fdf24da/4:3/w_959,h_719,c_limit/gimnasios-discotecas-nueva-normalidad.jpg"
              alt="GYM"
              className="w-64 h-64 rounded-full shadow-lg"
            />
          </div>
          </section>
          <section className="text-lg">
            <h2 className="text-2xl font-bold mb-2">Horario</h2>
            <p>Lunes a Viernes: 8:00 AM - 10:00 PM</p>
            <p>Sabados: 9:00 AM - 9:00 PM</p>
            <p>Closed on Sunday</p>
          </section>

        </div>
      );
}

export default Home;