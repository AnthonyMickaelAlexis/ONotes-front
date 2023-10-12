import React, { useEffect, useRef } from 'react';
import './profile.scss';
import NavigationMenuComponent from '../../components/NavigationMenuComponent';
import TagComponent from '../../components/TagComponent';
import Icon from '../../assets/images/logo192.png';
import startAnimation from '../../utils/fallingTags';



function ProfileView() {

    const canvas = useRef();
    useEffect(() => {
        startAnimation(canvas.current);
        console.log(canvas);
    }, [])
    const fallingTags = [
        {key: 0, icon: Icon, text: 'React', textColor: 'white', bgColor: 'blue'},
        {key: 1, icon: Icon, text: 'React', textColor: 'white', bgColor: 'red'},
        {key: 2, icon: Icon, text: 'React', textColor: 'white', bgColor: 'green'},
        {key: 3, icon: Icon, text: 'React', textColor: 'white', bgColor: 'black'},
        {key: 4, icon: Icon, text: 'React', textColor: 'white', bgColor: 'purple'},
      ]

      const articles = [
        {key: 0, title: 'React', subTitle: 'A short react\'s description', date: '22/10/2023'},
        {key: 1, title: 'React', subTitle: 'A short react\'s description', date: '22/10/2023'},
        {key: 2, title: 'React', subTitle: 'A short react\'s description', date: '22/10/2023'},
        {key: 3, title: 'React', subTitle: 'A short react\'s description', date: '22/10/2023'},
      ]
    const token = localStorage.getItem('token');
    console.log(token);
  return (
    <div className="profile-view">
        <NavigationMenuComponent />
        <section className='profile-view--profile_card'>
            <img src='https://picsum.photos/200/300' alt='profile' />
            <h3>UserName</h3>
        </section>
        <section className='profile-view--left_section'>
            <article ref={canvas} className='profile-view--tag_container'>
                <h2>VOS TAGS
                    <button>
                        Tous vos tags 
                    </button>
                </h2>
                {fallingTags && fallingTags.map(tagElement =>
                    <TagComponent key={`tag${tagElement.key}`} icon={tagElement.icon} text={tagElement.text} textColor={tagElement.textColor} bgColor={tagElement.bgColor} position={'absolute'} />
                )}
            </article>
            <article className='profile-view--articles_container'>
                <h2>VOS ARTICLES
                    <button>
                        Tous vos articles
                    </button>
                </h2>
                {articles && articles.map(article =>
                    <div className='profile-view--articles_container__article' key={article.key}>
                        <h3>{article.title}</h3>
                        <p>{article.subTitle} <span>{article.date}</span></p>
                    </div>
                )}
            </article>
        </section>

    </div>
  );
}

export default ProfileView;