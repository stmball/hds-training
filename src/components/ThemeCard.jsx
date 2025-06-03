import * as React from "react"
import { Link } from "gatsby"


const ThemeCard = ({ theme }) => {

  let height = theme.hero ? "h-64" : ""
  let font_size = theme.hero ? "text-4xl" : "text-2xl";

  return (
    <Link key={theme.fields.slug} className={`p-4 rounded-md card bg-white shadow-md w-full ${height} flex flex-col justify-between`} to={theme.fields.slug} >
      <section className="py-2">
        {
          theme.top_text &&
          <p className="text-slate-400 text-xs italic pb-2">{theme.top_text}</p>
        }
        <header>
          <h2 className={`font-bold text-slate-900 pb-2 ${font_size}`}>{theme.title}</h2>
        </header>
        <p
          dangerouslySetInnerHTML={{
            __html: theme.description,
          }}
          className="text-xs"
        />
      </section>
      {
        theme.suitability || theme.guides ?
          <section className="border-t border-t-slate-200 py-1 text-xs italic">
            {theme.suitability} {theme.guides && <span> - Sessions: {theme.guides.length}</span>}
          </section>
          : <></>
      }
    </Link >
  )
}


export default ThemeCard;
