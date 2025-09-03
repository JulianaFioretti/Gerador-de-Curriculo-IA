function PreviewSection() {
  return (
    <div className="flex-1 bg-green-200 p-4">
      <h1>Pagina 2</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod reiciendis ullam illo ut laudantium? Provident necessitatibus nostrum officia, eligendi porro, hic alias quo illum corrupti vero nemo, placeat recusandae atque?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus maxime autem, magni corporis corrupti eum cumque ut asperiores assumenda, explicabo deleniti molestiae, est non modi nulla necessitatibus commodi neque harum?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, quisquam magnam. Eum officiis ratione fugit possimus, nostrum ipsam asperiores tempore, vel vitae est totam a, in optio qui libero cupiditate.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas fuga cum blanditiis est quibusdam vitae nam, ut impedit accusamus eligendi illo praesentium minus excepturi quae tenetur id? Autem, dolorem. Sed nulla facere pariatur commodi quasi quae non! Accusantium numquam totam consequuntur, sunt veritatis enim quam ipsam minima ea laborum? Officia, incidunt deleniti eius aperiam debitis sapiente aliquam obcaecati eaque? At officiis excepturi reiciendis illo nostrum fugit praesentium cumque hic perferendis. Quas illum minima velit quo aperiam nemo, dolore quaerat consequuntur reprehenderit distinctio culpa voluptates enim a illo perspiciatis ea eius eligendi quidem iusto? Mollitia odio ex nobis omnis sunt nihil ipsam, quos, ut est eius quaerat similique et, dicta explicabo sint commodi pariatur ducimus voluptas. Dolor, voluptatem tenetur officia, nobis nisi distinctio quae necessitatibus, voluptates soluta accusantium quibusdam rerum doloremque. Sunt aspernatur expedita iusto earum sit deserunt, eveniet explicabo veniam voluptates exercitationem quas molestias dolores ullam voluptatibus odit, magni ipsum ipsam? Ad quasi omnis eum unde iusto. Quidem eligendi, quae ad rem, dolores maxime dolorum facilis illum eius ratione repudiandae consequatur quaerat! Obcaecati quis dicta, nulla veniam repellat quas, aspernatur temporibus minima iure consequatur sequi incidunt aperiam deserunt repudiandae eos, quos ea. Distinctio omnis consectetur ad, ea delectus inventore exercitationem corrupti numquam. Dignissimos voluptate aperiam explicabo ab culpa quod vel ut, quo cum. Laborum officia neque corporis debitis eligendi deleniti asperiores est quam esse unde, optio dignissimos fugit placeat quidem dolorem. Tempore dolorem vel eos quos. Possimus fugit recusandae quibusdam harum molestiae, animi distinctio perferendis, sed maxime voluptate veniam ad! Nesciunt dolorum incidunt mollitia sint quas, molestiae rem alias praesentium error ab ex soluta quis deleniti vel ipsum! Porro recusandae earum ipsam delectus perferendis iure magnam nihil vero ut odit aut praesentium iusto dicta in esse animi eius, maiores sit soluta. Incidunt, officiis? Dolorum quis voluptatem iure illum nihil ipsa unde corrupti voluptatum vitae dolor quam error saepe tenetur porro tempore aut fuga laboriosam ratione, omnis dolorem eaque cumque. Magni illum quas perferendis maiores ut earum voluptas, aliquam libero maxime sed quam quae ea pariatur animi veniam nostrum quos. Commodi repellat, error ex distinctio dignissimos et inventore aliquam. Nulla quo vero illo eveniet veniam tempore possimus in eaque blanditiis quaerat modi magni repudiandae, nostrum maiores fuga sequi laborum, quam, quae voluptas! Eaque laboriosam maiores expedita nam deserunt velit recusandae quae amet deleniti tenetur ea, repellat at ipsum id cum modi natus rerum placeat! Ipsa animi excepturi numquam debitis, modi nulla perferendis minima laborum aliquam deleniti accusantium laboriosam expedita, ea placeat molestias facilis dolore fuga nostrum eum cum, rem necessitatibus. Recusandae quia accusantium libero! Quas ut qui enim, modi debitis repudiandae consequuntur porro sunt perspiciatis maiores maxime voluptatibus quod. Saepe tempora fuga consequuntur eaque illum repellendus quis ipsum minima esse in cupiditate voluptatum itaque voluptatem, dolore, quaerat libero eius animi officiis quidem aliquam. Quod consequatur consectetur dolorem? Fugiat maxime eos maiores adipisci quisquam earum quia dicta fuga molestias iure expedita deserunt porro, delectus voluptatibus deleniti, blanditiis commodi natus eveniet aliquam. Repudiandae expedita ut voluptatibus tempora saepe laborum mollitia hic nihil inventore.
      </p>

      <h3 className="text-lg font-semibold mt-6">Experiências Profissionais</h3>
       <ul className="list-disc pl-5">
        {cvData.experiencias.map((exp, i) => (
          <li key={i}>
            <p><strong>{exp.cargo}</strong> em {exp.empresa} ({exp.periodo})</p>
            <p>{exp.descricao}</p>
            {exp.atual && <span className="text-green-600 text-sm"> (Emprego Atual)</span>}
          </li>
        ))}
       </ul>

    </div>
  );
}

export default PreviewSection;
