import React, { useRef, useEffect } from 'react';
import './profile.scss';
import NavigationMenuComponent from '../../components/NavigationMenuComponent';
import TagComponent from '../../components/TagComponent';
import startAnimation from '../../utils/fallingTags';
import { useGetUserProfileQuery } from '../../data/user';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { formatIsoDate } from '../../utils/date';

function ProfileView() {
    const canvas = useRef();
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const {data} = useGetUserProfileQuery({ token: cookies.token })
    
    const articles = data?.data[1];
    const fallingTags = data?.data[2];
    
    useEffect(() => {
        startAnimation(canvas.current);
    }, [startAnimation])

    return (
    <div className="profile-view">
        <NavigationMenuComponent />
        <section className='profile-view--left_section'>
            <article ref={canvas} className='profile-view--tag_container'>
                <h2>VOS TAGS
                    <button>
                        Tous vos tags 
                    </button>
                </h2>
                {fallingTags && fallingTags.map(tagElement =>
                    <TagComponent 
                        key={`tag${tagElement.key}`}
                        icon={tagElement.icon}
                        text={tagElement.text}
                        textColor={tagElement.textColor}
                        bgColor={tagElement.bgColor}
                        position={'absolute'}
                />
                )}
            </article>
            <article className='profile-view--articles_container'>
                <h2>VOS ARTICLES
                    <button>
                        Tous vos articles
                    </button>
                </h2>
                {articles && articles.map(article =>
                    <div className='profile-view--articles_container__article' key={article.id} onClick={() => {
                       navigate(`/article/${article.id}`) 
                    }}>
                        <h3>{article.title.length >= 10 ? article.title.substring(0,10) + '...' : article.title }</h3>
                        <p>{article.subtitle.length >= 25 ? article.subtitle.substring(0,25) + '...' : article.subtitle } <span>{formatIsoDate(article.updated_at)}</span></p>
                    </div>
                )}
            </article>
        </section>

        {data &&    ( 
            <section className='profile-view--profile_card'>
                <img src={data.data[0].avatar ? data.data[0].avatar : 'https://picsum.photos/200/300'} alt='profile' />
                <h3>{data.data[0].pseudo}</h3>
                <div>
                    <p>{data.data[0].firstname} {data.data[0].lastname}</p>
                    <p>{data.data[0].email}</p>
                </div>
            </section>
            )
        }

    </div>
  );
}

export default ProfileView;