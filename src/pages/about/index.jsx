import React, { Component } from 'react';
import banner from '../../assets/about_banner.svg'
import './style.scss'

class About extends Component {
  render() {
    return (
      <div className='about pt-5'>
        <div className="row row-cols-2">
          <div className="col">
            <div className="card bg-transparent border-0 h-100 p-5 m-5">
              <div className="card-body ">
                <h2 className="card-title pt-3 pb-3">Próspere</h2>
                <p className="card-text">
                "Em  bilhões de galáxias, você jamais encontrará o mesmo mais de uma vez." 
                Nós somos a equipe do Projeto Próspere, Aqui você irá poder apreender sobre como  
                controlar suas economias através da métodos intuitivos, estes sendo a gameficação. 
                Com o conhecimento adquirido você poderá formar um futuro melhor para si mesmo..
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-transparent border-0 h-100 p-5 m-5">
              <img src={banner} className="card-img-bottom" alt="..." />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default About