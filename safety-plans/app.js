// app.js - Business Logic for Ruiz & Associates Safety Plan Generator
// Relies on global 'db' initialized in ../shared/auth.js

// Default Data Seed for Safety Modules (Cal/OSHA Templates - Bilingual English & Spanish)
const defaultModulesSeed = [
    {
        id: "iipp",
        name: "Injury and Illness Prevention Program",
        abbreviation: "IIPP",
        content_template: `<h1>Injury and Illness Prevention Program (IIPP)</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Effective Date:</strong> {{effective_date}}</p>
<p><strong>Designated Safety Officer:</strong> {{safety_officer}}</p>
<p>This Injury and Illness Prevention Program (IIPP) is established in compliance with Cal/OSHA regulations (California Code of Regulations, Title 8, Section 3203). {{client_name}} is committed to providing a safe and healthy workplace for all employees. The policies and procedures outlined here apply to all operations and facilities located at {{client_address}}.</p>`,
        content_template_es: `<h1>Programa de Prevención de Lesiones y Enfermedades (IIPP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<p><strong>Oficial de Seguridad Designado:</strong> {{safety_officer}}</p>
<p>Este Programa de Prevención de Lesiones y Enfermedades (IIPP) se establece de conformidad con las regulaciones de Cal/OSHA (Título 8 del Código de Regulaciones de California, Sección 3203). {{client_name}} se compromete a proporcionar un lugar de trabajo seguro y saludable para todos los empleados. Las políticas y procedimientos descritos aquí se aplican a todas las operaciones e instalaciones ubicadas en {{client_address}}.</p>`,
        subsections: [
            {
                id: "iipp_resp",
                title: "Employer & Employee Responsibility / Responsabilidad",
                content_template: `<h2>1. Responsibility</h2>
<p>The Injury and Illness Prevention Program (IIPP) administrator, {{safety_officer}}, has the authority and responsibility for implementing the provisions of this program for {{client_name}}.</p>
<p>All managers and supervisors are responsible for implementing and maintaining the IIP Program in their work areas and for answering worker questions about the IIP Program. Every employee is responsible for working safely and reporting hazards immediately.</p>`,
                content_template_es: `<h2>1. Responsabilidad</h2>
<p>El administrador del Programa de Prevención de Lesiones y Enfermedades (IIPP), {{safety_officer}}, tiene la autoridad y la responsabilidad de implementar las disposiciones de este programa para {{client_name}}.</p>
<p>Todos los gerentes y supervisores son responsables de implementar y mantener el Programa IIP en sus áreas de trabajo y de responder las preguntas de los trabajadores sobre el Programa IIP. Cada empleado es responsable de trabajar de manera segura y reportar los peligros de inmediato.</p>`
            },
            {
                id: "iipp_comp",
                title: "Safety Compliance Procedures / Cumplimiento",
                content_template: `<h2>2. Compliance</h2>
<p>Management is responsible for ensuring that all safety and health policies and procedures are clearly communicated and understood by all employees. Managers and supervisors are expected to enforce the rules fairly and uniformly.</p>
<p>All employees are responsible for using safe work practices, for following all directives, policies and procedures, and for assisting in maintaining a safe work environment.</p>
<p>Our system of ensuring that all workers comply with the rules and maintain a safe work environment includes:</p>
<ol>
    <li>Informing workers of the provisions of our IIP Program.</li>
    <li>Evaluating the safe performance of all workers.</li>
    <li>Recognizing employees who perform safe and healthful work practices.</li>
    <li>Providing training to workers whose safety performance is deficient.</li>
    <li>Disciplining workers for failure to comply with safe and healthful work practices.</li>
    <li>The following practices: General Code of Safe Practices, Unsafe Acts & Conditions, and Specific Code of Safe Practices as outlined in the safety program.</li>
</ol>`,
                content_template_es: `<h2>2. Cumplimiento</h2>
<p>La dirección es responsable de garantizar que todas las políticas y procedimientos de seguridad y salud se comuniquen y comprendan claramente por parte de todos los empleados. Se espera que los gerentes y supervisores hagan cumplir las normas de manera justa y uniforme.</p>
<p>Todos los empleados son responsables de utilizar prácticas de trabajo seguras, de seguir todas las directrices, políticas y procedimientos, y de ayudar a mantener un entorno de trabajo seguro.</p>
<p>Nuestro sistema para garantizar que todos los trabajadores cumplan con las reglas y mantengan un entorno de trabajo seguro incluye:</p>
<ol>
    <li>Informar a los trabajadores sobre las disposiciones de nuestro Programa IIP.</li>
    <li>Evaluar el desempeño seguro de todos los trabajadores.</li>
    <li>Reconocer a los empleados que realizan prácticas de trabajo seguras y saludables.</li>
    <li>Proporcionar capacitación a los trabajadores cuyo desempeño de seguridad sea deficiente.</li>
    <li>Disciplinar a los trabajadores por no cumplir con las prácticas de trabajo seguras y saludables.</li>
    <li>Las siguientes prácticas: Código General de Prácticas Seguras, Actos y Condiciones Inseguras, y Código Específico de Prácticas Seguras como se describe en el programa de seguridad.</li>
</ol>`
            },
            {
                id: "iipp_comm",
                title: "Communication System / Comunicación",
                content_template: `<h2>3. Communication</h2>
<p>We recognize that open, two-way communication between management and staff on health and safety issues is essential to an injury-free, productive workplace. The following system of communication is designed to facilitate a continuous flow of safety and health information between management and staff in a form that is readily understandable and consists of one or more of the following items:</p>
<ul>
    <li>New worker orientation including a discussion of safety and health policies and procedures.</li>
    <li>Review of IIP Program.</li>
    <li>Workplace safety and health training programs.</li>
    <li>Regularly scheduled safety meetings.</li>
    <li>Effective communication of safety and health concerns between workers and supervisors, including translation where appropriate.</li>
    <li>Posted or distributed safety information.</li>
    <li>A system for workers to anonymously inform management about workplace hazards.</li>
    <li>Hiring of outside consulting firm to assist in implementation of I&IP Program.</li>
</ul>`,
                content_template_es: `<h2>3. Comunicación</h2>
<p>Reconocemos que la comunicación abierta y bidireccional entre la dirección y el personal sobre cuestiones de salud y seguridad es esencial para un lugar de trabajo libre de lesiones y productivo. El siguiente sistema de comunicación está diseñado para facilitar un flujo continuo de información sobre seguridad y salud entre la dirección y el personal en una forma que sea fácilmente comprensible y consta de uno o más de los siguientes elementos:</p>
<ul>
    <li>Orientación para nuevos trabajadores que incluye una discusión sobre las políticas y procedimientos de seguridad y salud.</li>
    <li>Revisión del Programa IIP.</li>
    <li>Programas de capacitación sobre seguridad y salud en el lugar de trabajo.</li>
    <li>Reuniones de seguridad programadas regularmente.</li>
    <li>Comunicación efectiva de las inquietudes de seguridad y salud entre trabajadores y supervisores, incluyendo traducción cuando sea apropiado.</li>
    <li>Información de seguridad publicada o distribuida.</li>
    <li>Un sistema para que los trabajadores informen de manera anónima a la dirección sobre los peligros en el lugar de trabajo.</li>
    <li>Contratación de una firma de consultoría externa para ayudar en la implementación del Programa I&IP.</li>
</ul>`
            },
            {
                id: "iipp_inspections",
                title: "Hazard Assessment / Inspecciones de Peligros",
                content_template: `<h2>4. Hazard Assessment</h2>
<p>Periodic inspections to identify and evaluate workplace hazards shall be performed by the following competent observer(s) in the following areas of our workplace:</p>
<table style="width:100%; border-collapse:collapse; margin-bottom:15px;" border="1" cellpadding="6">
    <thead>
        <tr style="background-color:#f1f5f9;">
            <th>Area of our Workplace</th>
            <th>Competent Observer</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Shop Operations</td><td>{{safety_officer}}</td></tr>
        <tr><td>Pesticide Applications</td><td>{{safety_officer}}</td></tr>
        <tr><td>Tractor Operators</td><td>{{safety_officer}}</td></tr>
        <tr><td>Irrigation Operations</td><td>{{safety_officer}}</td></tr>
    </tbody>
</table>
<p>Periodic inspections are performed according to the following schedule:</p>
<ol>
    <li>Monthly & Annually</li>
    <li>When we initially established our IIP Program.</li>
    <li>When new processes, substances, procedures or equipment which present potential new hazards are introduced into our workplace.</li>
    <li>When new, previously unidentified hazards are recognized.</li>
    <li>When occupational injuries and illnesses occur.</li>
    <li>When we hire and/or reassign permanent or intermittent workers to processes, operations, or tasks for which a hazard evaluation has not been previously conducted.</li>
    <li>Whenever workplace conditions warrant an inspection.</li>
</ol>
<p>Periodic inspections consist of identification and evaluation of workplace hazards utilizing applicable sections of the Hazard Assessment Checklist and any other effective methods.</p>`,
                content_template_es: `<h2>4. Evaluación de Peligros</h2>
<p>Las inspecciones periódicas para identificar y evaluar los peligros en el lugar de trabajo serán realizadas por los siguientes observadores competentes en las siguientes áreas de nuestro lugar de trabajo:</p>
<table style="width:100%; border-collapse:collapse; margin-bottom:15px;" border="1" cellpadding="6">
    <thead>
        <tr style="background-color:#f1f5f9;">
            <th>Área de Nuestro Lugar de Trabajo</th>
            <th>Observador Competente</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Operaciones del Taller</td><td>{{safety_officer}}</td></tr>
        <tr><td>Aplicación de Pesticidas</td><td>{{safety_officer}}</td></tr>
        <tr><td>Operadores de Tractores</td><td>{{safety_officer}}</td></tr>
        <tr><td>Operaciones de Riego</td><td>{{safety_officer}}</td></tr>
    </tbody>
</table>
<p>Las inspecciones periódicas se realizan de acuerdo con la siguiente programación:</p>
<ol>
    <li>Mensual y Anual</li>
    <li>Cuando establecimos inicialmente nuestro Programa IIP.</li>
    <li>Cuando se introducen en nuestro lugar de trabajo nuevos procesos, sustancias, procedimientos o equipos que presenten nuevos peligros potenciales.</li>
    <li>Cuando se reconocen peligros nuevos, no identificados previamente.</li>
    <li>Cuando ocurren lesiones y enfermedades ocupacionales.</li>
    <li>Cuando contratamos y/o reasignamos trabajadores permanentes o intermitentes a procesos, operaciones o tareas para las cuales no se ha realizado previamente una evaluación de peligros.</li>
    <li>Siempre que las condiciones del lugar de trabajo justifiquen una inspección.</li>
</ol>
<p>Las inspecciones periódicas consisten en la identificación y evaluación de los peligros en el lugar de trabajo utilizando las secciones aplicables de la Lista de Control de Evaluación de Peligros y cualquier otro método eficaz.</p>`
            },
            {
                id: "iipp_investigation",
                title: "Accident Investigations / Investigación de Accidentes",
                content_template: `<h2>5. Accident/Exposure Investigations</h2>
<p>Procedures for investigating workplace accidents and hazardous substance exposures include:</p>
<ol>
    <li>Visiting the accident scene as soon as possible.</li>
    <li>Interviewing injured workers and witnesses.</li>
    <li>Examining the workplace for factors associated with the accident/exposure.</li>
    <li>Determining the cause of the accident/exposure.</li>
    <li>Taking corrective action to prevent the accident/exposure from reoccurring.</li>
    <li>Recording the findings and corrective actions taken.</li>
</ol>`,
                content_template_es: `<h2>5. Investigaciones de Accidentes y Exposición</h2>
<p>Los procedimientos para investigar accidentes en el lugar de trabajo y exposiciones a sustancias peligrosas incluyen:</p>
<ol>
    <li>Visitar la escena del accidente lo antes posible.</li>
    <li>Entrevistar a los trabajadores lesionados y a los testigos.</li>
    <li>Examinar el lugar de trabajo en busca de factores asociados con el accidente/exposición.</li>
    <li>Determinar la causa del accidente/exposición.</li>
    <li>Tomar medidas correctivas para evitar que el accidente/exposición vuelva a ocurrir.</li>
    <li>Registrar los hallazgos y las medidas correctivas tomadas.</li>
</ol>`
            },
            {
                id: "iipp_correction",
                title: "Hazard Correction / Corrección de Peligros",
                content_template: `<h2>6. Hazard Correction</h2>
<p>Unsafe or unhealthy work conditions, practices, or procedures shall be corrected in a timely manner based on the severity of the hazards. Hazards shall be corrected according to the following procedures:</p>
<ol>
    <li>When observed or discovered;</li>
    <li>When an imminent hazard exists, which cannot be immediately abated without endangering employee(s) and/or property, we will remove all exposed workers from the area except those necessary to correct the existing condition. Workers necessary to correct the hazardous condition shall be provided with the necessary protection; and</li>
    <li>All such actions taken and dates they were completed shall be documented on the appropriate forms.</li>
</ol>`,
                content_template_es: `<h2>6. Corrección de Peligros</h2>
<p>Las condiciones, prácticas o procedimientos de trabajo inseguros o insalubres se corregirán de manera oportuna según la gravedad de los peligros. Los peligros se corregirán de acuerdo con los siguientes procedimientos:</p>
<ol>
    <li>Cuando se observen o descubran;</li>
    <li>Cuando exista un peligro inminente, que no pueda eliminarse inmediatamente sin poner en peligro a los empleados y/o la propiedad, retiraremos a todos los trabajadores expuestos del área, excepto a los necesarios para corregir la condición existente. Los trabajadores necesarios para corregir la condición peligrosa recibirán la protección necesaria; y</li>
    <li>Todas las acciones tomadas y las fechas en que se completaron se documentarán en los formularios correspondientes.</li>
</ol>`
            },
            {
                id: "iipp_training",
                title: "Training and Instruction / Capacitación e Instrucción",
                content_template: `<h2>7. Training and Instruction</h2>
<p>All workers, including managers and supervisors, shall have training and instruction on general and job-specific safety and health practices. Training and instruction shall be provided as follows:</p>
<ol>
    <li>When the Safety Program is first established;</li>
    <li>To all new workers and any workers given new job assignments for which training has not been previously provided;</li>
    <li>Whenever new substances, processes, procedures or equipment are introduced to the workplace and represent a new hazard;</li>
    <li>Whenever the employer is made aware of a new or previously unrecognized hazard;</li>
    <li>To supervisors to familiarize them with the safety and health hazards to which workers under their immediate direction and control may be exposed; and</li>
    <li>To all workers with respect to hazards specific to each employee’s job assignment.</li>
</ol>
<p>Workplace safety and health practices for all industries include, but are not limited to, the following:</p>
<ul>
    <li>Explanation of the employer’s IIPP, emergency action plan and fire prevention plan, and measures for reporting any unsafe conditions, work practices, injuries and when additional instruction is needed.</li>
    <li>Use of appropriate clothing, including gloves, footwear, and personal protective equipment.</li>
    <li>Information about chemical hazards to which employees could be exposed and other hazard communication program information.</li>
    <li>Availability of toilet, hand-washing, and drinking water facilities.</li>
    <li>Provisions of medical services and first aid including emergency procedures.</li>
</ul>
<p>In addition, we provide specific instructions to all workers regarding hazards unique to their job assignment, to the extent that such information was not already covered in other training.</p>`,
                content_template_es: `<h2>7. Capacitación e Instrucción</h2>
<p>Todos los trabajadores, incluidos los gerentes y supervisores, recibirán capacitación e instrucción sobre prácticas generales y específicas de seguridad y salud en el trabajo. La capacitación e instrucción se proporcionará de la siguiente manera:</p>
<ol>
    <li>Cuando el Programa de Seguridad se establece por primera vez;</li>
    <li>A todos los nuevos trabajadores y a los trabajadores a los que se les asignen nuevas tareas de trabajo para las cuales no se haya proporcionado capacitación previamente;</li>
    <li>Siempre que se introduzcan en el lugar de trabajo nuevas sustancias, procesos, procedimientos o equipos y representen un nuevo peligro;</li>
    <li>Siempre que se informe al empleador sobre un peligro nuevo o que no se haya reconocido previamente;</li>
    <li>A los supervisores para familiarizarlos con los peligros de seguridad y salud a los que pueden estar expuestos los trabajadores bajo su dirección y control inmediatos; y</li>
    <li>A todos los trabajadores con respecto a los peligros específicos de la asignación de trabajo de cada empleado.</li>
</ol>
<p>Las prácticas de seguridad y salud en el lugar de trabajo para todas las industrias incluyen, entre otras, las siguientes:</p>
<ul>
    <li>Explicación del IIPP del empleador, el plan de acción de emergencia y el plan de prevención de incendios, y las medidas para reportar cualquier condición insegura, prácticas de trabajo, lesiones y cuando se necesite instrucción adicional.</li>
    <li>Uso de ropa adecuada, incluidos guantes, calzado y equipo de protección personal.</li>
    <li>Información sobre los peligros químicos a los que los empleados podrían estar expuestos y otra información del programa de comunicación de peligros.</li>
    <li>Disponibilidad de instalaciones de inodoro, lavado de manos y agua potable.</li>
    <li>Disposiciones de servicios médicos y primeros auxilios, incluidos los procedimientos de emergencia.</li>
</ul>
<p>Además, brindamos instrucciones específicas a todos los trabajadores con respecto a los peligros únicos de su asignación de trabajo, en la medida en que dicha información no haya sido cubierta en otras capacitaciones.</p>`
            },
            {
                id: "iipp_access",
                title: "Employee Access to IIPP / Acceso de los Empleados",
                content_template: `<h2>8. Employee Access to the IIPP</h2>
<p>Our employees – or their designated representatives - have the right to examine and receive a copy of our IIPP. This will be accomplished by the following:</p>
<ol>
    <li>Provide access in a reasonable time, place, and manner, but in no event later than five (5) business days after the request for access is received from an employee or designated representative.</li>
    <ul>
        <li>Whenever an employee or designated representative requests a copy of the Program, we will provide the requester a printed copy of the Program, unless the employee or designated representative agrees to receive an electronic copy of the Program.</li>
        <li>One printed copy of the Program will be provided free of charge. If the employee or designated representative requests additional copies of the Program within one (1) year of the previous request and the Program has not been updated with new information since the prior copy was provided, we may charge reasonable, non-discriminatory reproduction costs for the additional copies.</li>
    </ul>
</ol>
<p>Any copy provided to an employee or their designated representative need not include any of the records of the steps taken to implement and maintain the written IIP Program.</p>
<p>Where we have distinctly different and separate operations with distinctly separate and different IIPPs, we may limit access to the IIPP applicable to the employee requesting it.</p>
<p>An employee must provide written authorization in order to make someone their “designated representative.” A recognized or certified collective bargaining agent will be treated automatically as a designated representative for the purpose of access to the company IIPP. The written authorization must include the following information:</p>
<ul>
    <li>The name and signature of the employee authorizing the designated representative.</li>
    <li>The date of the request.</li>
    <li>The name of the designated representative.</li>
    <li>The date upon which the written authorization will expire (if less than 1 year).</li>
</ul>`,
                content_template_es: `<h2>8. Acceso de los Empleados al IIPP</h2>
<p>Nuestros empleados, o sus representantes designados, tienen derecho a examinar y recibir una copia de nuestro IIPP. Esto se logrará mediante lo siguiente:</p>
<ol>
    <li>Proporcionar acceso en un tiempo, lugar y manera razonables, pero en ningún caso más tarde de cinco (5) días hábiles después de que se reciba la solicitud de acceso de un empleado o representante designado.</li>
    <ul>
        <li>Siempre que un empleado o representante designado solicite una copia del Programa, le proporcionaremos al solicitante una copia impresa del Programa, a menos que el empleado o representante designado acepte recibir una copia electrónica del Programa.</li>
        <li>Se proporcionará una copia impresa del Programa de forma gratuita. Si el empleado o representante designado solicita copias adicionales del Programa dentro de un (1) año de la solicitud anterior y el Programa no ha sido actualizado con nueva información desde que se proporcionó la copia anterior, podemos cobrar costos de reproducción razonables y no discriminatorios por las copias adicionales.</li>
    </ul>
</ol>
<p>Cualquier copia proporcionada a un empleado o a su representante designado no necesita incluir ninguno de los registros de los pasos tomados para implementar y mantener el Programa IIP por escrito.</p>
<p>Cuando tengamos operaciones claramente diferentes y separadas con IIPP claramente separados y diferentes, podemos limitar el acceso al IIPP aplicable al empleado que lo solicita.</p>
<p>Un empleado debe proporcionar una autorización por escrito para designar a alguien como su "representante designado". Un agente de negociación colectiva reconocido o certificado será tratado automáticamente como un representante designado a los efectos de acceder al IIPP de la empresa. La autorización por escrito debe incluir la siguiente información:</p>
<ul>
    <li>El nombre y la firma del empleado que autoriza al representante designado.</li>
    <li>La fecha de la solicitud.</li>
    <li>El nombre del representante designado.</li>
    <li>La fecha en la que expirará la autorización por escrito (si es menor de 1 año).</li>
</ul>`
            },
            {
                id: "iipp_recordkeeping",
                title: "Recordkeeping / Registro de Datos",
                content_template: `<h2>9. Recordkeeping</h2>
<p>Our record keeping policy is defined under Category 1. We have taken the following steps to implement and maintain our I&IP Program:</p>
<ol>
    <li>Records of hazard assessment inspections, including the person or persons conducting the inspection, the unsafe conditions and work practices that have been identified and the action taken to correct the identified unsafe conditions and work practices, are recorded on a hazard assessment and correction form; and</li>
    <li>Documentation of safety and health training for each worker, including the workers’ name or other identifier, training dates, type(s) of training, and training providers are recorded on a worker training and instruction form.</li>
</ol>
<p>Inspection records and training documentation will be maintained for one year, except for training records of employees who have worked for less than one year which are provided to the worker upon termination of employment.</p>`,
                content_template_es: `<h2>9. Mantenimiento de Registros</h2>
<p>Nuestra política de mantenimiento de registros se define bajo la Categoría 1. Hemos tomado las siguientes medidas para implementar y mantener nuestro Programa I&IP:</p>
<ol>
    <li>Los registros de las inspecciones de evaluación de peligros, incluida la persona o personas que realizaron la inspección, las condiciones y prácticas de trabajo inseguras que se han identificado y las medidas tomadas para corregir las condiciones y prácticas de trabajo inseguras identificadas, se registran en un formulario de evaluación y corrección de peligros; y</li>
    <li>La documentación de la capacitación en seguridad y salud de cada trabajador, incluido el nombre del trabajador u otro identificador, las fechas de capacitación, los tipos de capacitación y los proveedores de capacitación se registran en un formulario de capacitación e instrucción del trabajador.</li>
</ol>
<p>Los registros de inspección y la documentación de capacitación se mantendrán durante un año, excepto los registros de capacitación de los empleados que hayan trabajado por menos de un año, los cuales se entregan al trabajador al finalizar su empleo.</p>`
            },
            {
                id: "iipp_training_subjects",
                title: "List of Training Subjects / Lista de Temas de Capacitación",
                content_template: `<h2>10. List of Safety Training Subjects</h2>
<p>We train our workers in the following safety training subjects based on the hazards they face in their work assignments:</p>
<ul>
    <li>General Code of Safe Practices</li>
    <li>Progressive Discipline Policy</li>
    <li>Unsafe Acts and Conditions</li>
    <li>Hazardous Materials Communication Safety & Safety Data Sheets</li>
    <li>Shear/Cutting/Pinch Points</li>
    <li>Hydraulics</li>
    <li>Farm Equipment Fuel Safety</li>
    <li>Hand Tools</li>
    <li>Eye Protection</li>
    <li>Hearing Protection</li>
    <li>General Shop Safety</li>
    <li>Arc Welding</li>
    <li>Agricultural Fire Safety</li>
    <li>Tractor Safety</li>
    <li>Defensive Driving</li>
    <li>Driver Safety</li>
    <li>Heat Stress Prevention</li>
    <li>Ladder Safety</li>
    <li>Back Safety and Lifting Safely</li>
    <li>Slips, Trips, and Falls</li>
    <li>Office Safety</li>
    <li>Flammable and Combustible Materials</li>
    <li>Personal Protective Equipment (PPE)</li>
    <li>Housekeeping Safety</li>
    <li>Air Compressor Safety</li>
    <li>Machine Guarding</li>
    <li>Electrical Safety</li>
    <li>Power Tool Safety</li>
    <li>Lock Out and Tag Out Safety</li>
    <li>Material Handling Safety</li>
    <li>Bloodborne pathogens and other biological hazards</li>
    <li>Emergencies (Fire, Earthquakes, Floods, and Explosions)</li>
    <li>Workplace Violence Prevention Plan</li>
</ul>`,
                content_template_es: `<h2>10. Lista de Temas de Capacitación en Seguridad</h2>
<p>Capacitamos a nuestros trabajadores en los siguientes temas de capacitación en seguridad según los riesgos que enfrentan en sus asignaciones de trabajo:</p>
<ul>
    <li>Código General de Prácticas Seguras</li>
    <li>Política de Disciplina Progresiva</li>
    <li>Actos y Condiciones Inseguras</li>
    <li>Seguridad en Comunicación de Materiales Peligrosos y Hojas de Datos de Seguridad (SDS)</li>
    <li>Puntos de Cizalla/Corte/Pellizco</li>
    <li>Hidráulica</li>
    <li>Seguridad de Combustible de Equipos Agrícolas</li>
    <li>Herramientas de Mano</li>
    <li>Protección de Ojos</li>
    <li>Protección de Oídos</li>
    <li>Seguridad General del Taller</li>
    <li>Soldadura por Arco</li>
    <li>Seguridad contra Incendios Agrícolas</li>
    <li>Seguridad en Tractores</li>
    <li>Manejo Defensivo</li>
    <li>Seguridad del Conductor</li>
    <li>Prevención del Estrés por Calor</li>
    <li>Seguridad en Escaleras</li>
    <li>Seguridad de la Espalda y Levantamiento Seguro</li>
    <li>Resbalones, Tropezones y Caídas</li>
    <li>Seguridad en la Oficina</li>
    <li>Materiales Inflamables y Combustibles</li>
    <li>Equipo de Protección Personal (PPE)</li>
    <li>Seguridad en el Orden y la Limpieza</li>
    <li>Seguridad de Compresores de Aire</li>
    <li>Protección de Maquinaria</li>
    <li>Seguridad Eléctrica</li>
    <li>Seguridad de Herramientas Eléctricas</li>
    <li>Seguridad de Bloqueo y Etiquetado (Lockout/Tagout)</li>
    <li>Seguridad en el Manejo de Materiales</li>
    <li>Patógenos Transmitidos por la Sangre y otros riesgos biológicos</li>
    <li>Emergencias (Incendios, Terremotos, Inundaciones y Explosiones)</li>
    <li>Plan de Prevención de Violencia en el Lugar de Trabajo</li>
</ul>`
            },
            {
                id: "iipp_gcosp",
                title: "General Code of Safe Practices / Código de Prácticas Seguras",
                content_template: `<h2>11. General Code of Safe Practices</h2>
<p>It is the policy of {{client_name}} that everything possible will be done to protect our employees from accidents and injuries while on the job. To this end, we are presenting the following information for your safety and benefit. You are expected to know and observe these practices:</p>
<ol>
    <li>All employees will follow these safe practice rules; render every possible aid to safe operations, and shall immediately report all unsafe conditions and practices to their immediate supervisor.</li>
    <li>All employees will be given periodic accident prevention and safety instructions. These instructions may be provided during monthly safety meetings and other periodic trainings.</li>
    <li>Anyone known to be under the influence of alcohol and/or drugs WILL NOT be allowed on the job while in that condition and is subject to either immediate suspension or termination. This especially applies to all tractor and forklift operators and when using other company vehicles.</li>
    <li>No one will be knowingly permitted or required to work while his/her ability or alertness is so impaired by fatigue, illness or other cause that might necessarily expose the individual or others to injury.</li>
    <li>All employees will use proper lifting methods when handling irrigator equipment or when lifting materials. All irrigation pipes should be secured during transportation.</li>
    <li>Tractor and Forklift operators will use seat belts while operating and obey all applicable laws and Cal/OSHA regulations while operating in the field and on the road.</li>
    <li>Workers WILL NOT handle or tamper with electrical equipment, machinery or air or water lines in a manner not within the scope of their duties, unless they have received instructions on specific safe practice procedures by their supervisor.</li>
    <li>All employees who handle pesticides will receive training prior to using these and thereafter annually as required by California regulations. Any other employees exposed to pesticides will receive training on how to protect themselves from dangers associated with this.</li>
    <li>All employees will participate in safety meetings conducted by their supervisor on a regular basis. Immediately report ALL hazards that require immediate attention.</li>
    <li>All injuries will be reported promptly to the supervisor or management so that arrangements can be made for medical and/or first aid treatment.</li>
    <li>All employees will wear personal protective equipment, including appropriate footwear or shoes, whenever they are exposed to flying particles, handling pesticides, or whenever certain assignments require that the worker be protected from exposure to dangers.</li>
    <li>All employees will conduct themselves appropriately at all times and avoid sexual harassment and/or any type of violent acts while working at {{client_name}}.</li>
    <li>Failure to immediately notify a supervisor or management of a work-related injury or illness constitutes a violation of the {{client_name}} policy and subjects the employee to disciplinary action.</li>
</ol>`,
                content_template_es: `<h2>11. Código General de Prácticas Seguras</h2>
<p>Es política de {{client_name}} que se hará todo lo posible para proteger a nuestros empleados de accidentes y lesiones mientras están en el trabajo. Con este fin, presentamos la siguiente información para su seguridad y beneficio. Se espera que usted conozca y observe estas prácticas:</p>
<ol>
    <li>Todos los empleados seguirán estas reglas de prácticas seguras; brindarán toda la ayuda posible para las operaciones seguras y reportarán de inmediato todas las condiciones y prácticas inseguras a su supervisor inmediato.</li>
    <li>Todos los empleados recibirán instrucciones periódicas de prevención de accidentes y seguridad. Estas instrucciones pueden proporcionarse durante las reuniones mensuales de seguridad y otras capacitaciones periódicas.</li>
    <li>Cualquier persona que se sepa que está bajo la influencia del alcohol y/o drogas NO SE PERMITIRÁ en el trabajo en esa condición y está sujeta a suspensión o despido inmediato. Esto se aplica especialmente a todos los operadores de tractores y montacargas y al usar otros vehículos de la empresa.</li>
    <li>No se permitirá ni se requerirá a sabiendas que nadie trabaje mientras su capacidad o estado de alerta estén tan afectados por la fatiga, enfermedad u otra causa que pueda exponer necesariamente al individuo o a otros a lesiones.</li>
    <li>Todos los empleados utilizarán métodos de levantamiento adecuados al manipular equipos de riego o al levantar materiales. Todos los tubos de riego deben asegurarse durante el transporte.</li>
    <li>Los operadores de tractores y montacargas usarán cinturones de seguridad mientras operan y obedecerán todas las leyes aplicables y regulaciones de Cal/OSHA mientras operan en el campo y en la carretera.</li>
    <li>Los trabajadores NO manipularán ni alterarán equipos eléctricos, maquinaria o líneas de aire o agua de una manera que no esté dentro del alcance de sus funciones, a menos que hayan recibido instrucciones sobre procedimientos específicos de prácticas seguras por parte de su supervisor.</li>
    <li>Todos los empleados que manejen pesticidas recibirán capacitación antes de usarlos y, a partir de entonces, anualmente, según lo exigen las regulaciones de California. Cualquier otro empleado expuesto a pesticidas recibirá capacitación sobre cómo protegerse de los peligros asociados con esto.</li>
    <li>Todos los empleados participarán en las reuniones de seguridad dirigidas por su supervisor de forma regular. Reporte de inmediato TODOS los peligros que requieran atención inmediata.</li>
    <li>Todas las lesiones se informarán de inmediato al supervisor o a la dirección para que se puedan organizar tratamientos médicos y/o de primeros auxilios.</li>
    <li>Todos los empleados usarán equipo de protección personal, incluido el calzado o zapatos adecuados, siempre que estén expuestos a partículas voladoras, manipulen pesticidas o cuando ciertas tareas requieran que el trabajador esté protegido contra la exposición a peligros.</li>
    <li>Todos los empleados se comportarán adecuadamente en todo momento y evitarán el acoso sexual y/o cualquier tipo de acto violento mientras trabajan en {{client_name}}.</li>
    <li>El hecho de no notificar de inmediato a un supervisor o a la dirección sobre una lesión o enfermedad relacionada con el trabajo constituye una violación de la política de {{client_name}} y somete al empleado a medidas disciplinarias.</li>
</ol>`
            },
            {
                id: "iipp_discipline",
                title: "Progressive Discipline / Disciplina Progresiva",
                content_template: `<h2>12. Progressive Discipline Procedure</h2>
<h3>Safety Violations</h3>
<p><strong>First Violation:</strong> The employee will be advised that he/she is not working safely. They will be instructed on: 1) How to perform the operation safely, and 2) The reason for it. A written "Employee Safety Warning Report" will be issued.</p>
<p><strong>Second Violation:</strong> The supervisor will issue a written "Employee Safety Warning Report". The employee will be subject to: 1) A three (3) day suspension without pay, or 2) Immediate termination.</p>
<p><strong>Third Violation:</strong> Same as the Second Violation and the violator may receive: 1) 5-day suspension without pay, or 2) termination from work.</p>
<h3>Life Threatening Violations</h3>
<p><strong>Definition:</strong> As a general rule, a life-threatening safety violation is one which may cause an immediate threat to life or serious injury to the employee personally or another individual.</p>
<p><strong>First Violation:</strong> After a thorough investigation, the following actions may be taken:</p>
<ol>
    <li>For deliberate, willful neglect and/or gross negligence: the employee will be terminated immediately from further employment.</li>
    <li>For ignorance or lack of common sense: the employee will be immediately suspended for five (5) working days without pay. Upon return, the employee must be counseled and trained on proper procedures on the specific safety violation.</li>
</ol>`,
                content_template_es: `<h2>12. Procedimiento de Disciplina Progresiva</h2>
<h3>Violaciones de Seguridad</h3>
<p><strong>Primera Infracción:</strong> Se advertirá al empleado que no está trabajando de manera segura. Se le instruirá sobre: 1) Cómo realizar la operación de manera segura, y 2) La razón de ello. Se emitirá un "Informe de Advertencia de Seguridad del Empleado" por escrito.</p>
<p><strong>Segunda Infracción:</strong> El supervisor emitirá un "Informe de Advertencia de Seguridad del Empleado" por escrito. El empleado estará sujeto a: 1) Una suspensión de tres (3) días sin goce de sueldo, o 2) Despido inmediato.</p>
<p><strong>Tercera Infracción:</strong> Igual que la Segunda Infracción y el infractor puede recibir: 1) Suspensión de 5 días sin goce de sueldo, o 2) despido del trabajo.</p>
<h3>Violaciones que Amenazan la Vida</h3>
<p><strong>Definición:</strong> Como regla general, una violación de seguridad que amenaza la vida es aquella que puede causar una amenaza inmediata a la vida o lesiones graves al empleado personalmente o a otra persona.</p>
<p><strong>Primera Infracción:</strong> Después de una investigación exhaustiva, se pueden tomar las siguientes acciones:</p>
<ol>
    <li>Por negligencia deliberada, intencional y/o negligencia grave: el empleado será despedido inmediatamente de su empleo.</li>
    <li>Por ignorancia o falta de sentido común: el empleado será suspendido de inmediato por cinco (5) días hábiles sin goce de sueldo. Al regresar, el empleado debe ser asesorado y capacitado sobre los procedimientos correctos sobre la violación de seguridad específica.</li>
</ol>`
            },
            {
                id: "iipp_unsafe_acts",
                title: "Unsafe Acts & Conditions / Actos Inseguros",
                content_template: `<h2>13. Unsafe Acts & Conditions</h2>
<p>The following unsafe acts and conditions are regarded as unacceptable in all industries. {{client_name}} asks its employees to exercise "common sense" at all times and to make his/her personal safety of foremost importance.</p>
<p><strong>Unsafe Acts Definition:</strong> "The unsafe act is a violation of an accepted safe procedure which could permit the occurrence of an accident."</p>
<ol>
    <li>Operating without authority or safety training</li>
    <li>Failure to warn or secure</li>
    <li>Operating at improper speed</li>
    <li>Making safety devices inoperable</li>
    <li>Using defective gear or equipment</li>
    <li>Using gear or equipment improperly, not consistent with the manner designed</li>
    <li>Failure to use personal protective equipment</li>
    <li>Improper loading or placement</li>
    <li>Improper lifting</li>
    <li>Servicing equipment that is in motion or which has not been rendered inoperable</li>
    <li>Horseplay</li>
    <li>Drinking alcoholic beverages, using any type of drugs prior to or during work hours, or prescribed medication that contains a narcotic drug.</li>
    <li>Failure to wear safety belt or shoes</li>
    <li>Failure to use safety devices</li>
</ol>
<p><strong>Unsafe Conditions Definition:</strong> "The unsafe condition is a hazardous physical condition or circumstance which could directly permit the occurrence of an accident."</p>
<ol>
    <li>Inadequate guards or protection</li>
    <li>Defective tools, equipment, substances</li>
    <li>Congested working conditions or work areas</li>
    <li>Inadequate warning system(s)</li>
    <li>Fire and explosion hazards</li>
    <li>Substandard housekeeping</li>
    <li>Hazardous atmospheric conditions, e.g., gases, dust, fumes, vapors, etc.</li>
    <li>Excessive noise</li>
    <li>Inadequate ventilation or lighting</li>
    <li>Confined spaces</li>
    <li>Failure to "lock-out" and "tag-out"</li>
</ol>
<p><strong>NOTE:</strong> Any employee who directly or willfully violates any of the above practices or conditions is subject to disciplinary action(s) that may lead up to or include immediate suspension or termination.</p>`,
                content_template_es: `<h2>13. Actos y Condiciones Inseguras</h2>
<p>Los siguientes actos y condiciones inseguras se consideran inaceptables en todas las industrias. {{client_name}} pide a sus empleados que ejerzan el "sentido común" en todo momento y que su seguridad personal sea de suma importancia.</p>
<p><strong>Definición de Actos Inseguros:</strong> "El acto inseguro es una violación de un procedimiento seguro aceptado que podría permitir la ocurrencia de un accidente."</p>
<ol>
    <li>Operar sin autorización o capacitación en seguridad</li>
    <li>No advertir o no asegurar</li>
    <li>Operar a una velocidad inadecuada</li>
    <li>Inhabilitar los dispositivos de seguridad</li>
    <li>Usar equipo o engranajes defectuosos</li>
    <li>Usar engranajes o equipos incorrectamente, no conforme a la manera en que fueron diseñados</li>
    <li>No utilizar equipo de protección personal</li>
    <li>Carga o colocación inadecuada</li>
    <li>Levantamiento inadecuado</li>
    <li>Dar servicio a equipos que están en movimiento o que no se han desactivado</li>
    <li>Juegos bruscos o bromas</li>
    <li>Beber bebidas alcohólicas, usar cualquier tipo de drogas antes o durante las horas de trabajo, o medicamentos recetados que contengan un narcótico.</li>
    <li>No usar cinturón de seguridad o zapatos</li>
    <li>No utilizar dispositivos de seguridad</li>
</ol>
<p><strong>Definición de Condiciones Inseguras:</strong> "La condición insegura es una condición o circunstancia física peligrosa que podría permitir directamente la ocurrencia de un accidente."</p>
<ol>
    <li>Protecciones o resguardos inadecuados</li>
    <li>Herramientas, equipos o sustancias defectuosas</li>
    <li>Condiciones de trabajo o áreas de trabajo congestionadas</li>
    <li>Sistemas de advertencia inadecuados</li>
    <li>Peligros de incendio y explosión</li>
    <li>Limpieza y orden deficientes</li>
    <li>Condiciones atmosféricas peligrosas, por ejemplo, gases, polvo, humos, vapores, etc.</li>
    <li>Ruido excesivo</li>
    <li>Ventilación o iluminación inadecuadas</li>
    <li>Espacios confinados</li>
    <li>No realizar el "bloqueo" y "etiquetado" (Lockout/Tagout)</li>
</ol>
<p><strong>NOTA:</strong> Cualquier empleado que viole directa o intencionalmente cualquiera de las prácticas o condiciones anteriores está sujeto a acciones disciplinarias que pueden llevar y pueden incluir la suspensión o el despido inmediato.</p>`
            },
            {
                id: "iipp_hazcom",
                title: "Hazard Communication / Comunicación de Peligros",
                content_template: `<h2>14. Hazard Communications Standard - "Right to Know"</h2>
<p>Proposition 65 requires that a clear and reasonable warning be given to persons potentially exposed to chemicals known to the State of California to cause cancer or reproductive toxicity. In conformance with CHWA regulations, the following warning is provided:</p>
<div style="border: 2px solid #eab308; padding: 15px; margin: 15px 0; background: #fffbeb; border-radius: 8px;">
    <h3 style="color:#b45309; margin-top:0; text-align:center;">WARNING / ADVERTENCIA</h3>
    <p>This area contains chemicals known to the State of California to cause cancer, birth defects, and other reproductive harm. Unauthorized entry is prohibited. Authorized personnel entering this area should refer to the applicable SDS and follow appropriate safety procedures. Persons having questions regarding this warning should write to {{client_name}}, {{client_address}}, Attention: {{safety_officer}}, Safety Coordinator.</p>
</div>
<h3>Things to Remember:</h3>
<ul>
    <li><strong>"CAUTION"</strong> Means less dangerous than Warning or Dangerous; however, 1 oz. to 1 pint of the material can cause death.</li>
    <li><strong>"WARNING"</strong> Means moderately poisonous; 1 to 3 tablespoons full can cause death.</li>
    <li><strong>"DANGER"</strong> Highly poisonous; a few drops or a tablespoon full can cause death.</li>
</ul>
<h3>On the SDS Numerical Coding:</h3>
<ul>
    <li>0 - Minimal danger</li>
    <li>1 - Slight danger</li>
    <li>2 - Moderate danger</li>
    <li>3 - Serious danger</li>
    <li>4 - Extreme danger</li>
</ul>
<h3>On the Color Coding:</h3>
<ul>
    <li><strong>RED:</strong> Flammability</li>
    <li><strong>BLUE:</strong> Health</li>
    <li><strong>YELLOW:</strong> Reactivity</li>
    <li><strong>WHITE:</strong> Protective Equipment</li>
</ul>
<p><strong>Secondary Containers:</strong> ALL secondary containers must be clearly labeled and clearly spell out the material inside the container. Information on the label should be sufficient to warn of any potential hazards. NEVER use unmarked or unidentified containers.</p>
<p><strong>Personal Protective Equipment (PPE):</strong> Use of PPE is clearly spelled out in the SDS. The employer is responsible for providing the required PPE. The employee is responsible for taking good care of the equipment and inspecting it prior to use. PPE is helpful only if used correctly. Ask your supervisor if unsure.</p>
<h3>Chemical Safety Facts:</h3>
<ul>
    <li>Practically ALL chemicals can present a physical or health hazard. READ and FOLLOW warnings before using.</li>
    <li>Safety Data Sheets (SDS) provide detailed information about products. SDS info is available to all employees.</li>
    <li>NEVER mix chemicals unless you are trained and authorized. Mixing simple chlorine cleaner with ammonia produces Chloramine, a deadly gas. Avoid the mistake of "more is better."</li>
</ul>`,
                content_template_es: `<h2>14. Estándar de Comunicación de Peligros - "Derecho a Saber"</h2>
<p>La Propuesta 65 exige que se proporcione una advertencia clara y razonable a las personas potencialmente expuestas a sustancias químicas que el Estado de California reconoce como causantes de cáncer o toxicidad reproductiva. En conformidad con las regulaciones de la CHWA, se proporciona la siguiente advertencia:</p>
<div style="border: 2px solid #eab308; padding: 15px; margin: 15px 0; background: #fffbeb; border-radius: 8px;">
    <h3 style="color:#b45309; margin-top:0; text-align:center;">WARNING / ADVERTENCIA</h3>
    <p>Esta área contiene sustancias químicas que el Estado de California reconoce como causantes de cáncer, defectos de nacimiento y otros daños reproductivos. Se prohíbe la entrada no autorizada. El personal autorizado que ingrese a esta área debe consultar la SDS aplicable y seguir los procedimientos de seguridad adecuados. Las personas que tengan preguntas sobre esta advertencia deben escribir a {{client_name}}, {{client_address}}, Atención: {{safety_officer}}, Coordinador de Seguridad.</p>
</div>
<h3>Cosas a Recordar:</h3>
<ul>
    <li><strong>"PRECAUCIÓN" (CAUTION):</strong> Significa menos peligroso que Advertencia o Peligroso; sin embargo, de 1 oz. a 1 pinta del material puede causar la muerte.</li>
    <li><strong>"ADVERTENCIA" (WARNING):</strong> Significa moderadamente venenoso; de 1 a 3 cucharadas soperas pueden causar la muerte.</li>
    <li><strong>"PELIGRO" (DANGER):</strong> Altamente venenoso; unas pocas de gotas o una cucharada sopera pueden causar la muerte.</li>
</ul>
<h3>En la Codificación Numérica de la SDS:</h3>
<ul>
    <li>0 - Peligro mínimo</li>
    <li>1 - Peligro leve</li>
    <li>2 - Peligro moderado</li>
    <li>3 - Peligro serio</li>
    <li>4 - Peligro extremo</li>
</ul>
<h3>En la Codificación de Colores:</h3>
<ul>
    <li><strong>ROJO:</strong> Inflamabilidad</li>
    <li><strong>AZUL:</strong> Salud</li>
    <li><strong>AMARILLO:</strong> Reactividad</li>
    <li><strong>BLANCO:</strong> Equipo de Protección</li>
</ul>
<p><strong>Contenedores Secundarios:</strong> TODOS los contenedores secundarios deben estar claramente etiquetados y detallar claramente el material dentro del contenedor. La información en la etiqueta debe ser suficiente para advertir de cualquier peligro potencial. NUNCA use contenedores sin marcar o no identificados.</p>
<p><strong>Equipo de Protección Personal (PPE):</strong> El uso de PPE está claramente detallado en la SDS. El empleador es responsable de proporcionar el PPE requerido. El empleado es responsable de cuidar bien el equipo e inspeccionarlo antes de su uso. El PPE es útil solo si se usa correctamente. Pregunte a su supervisor si no está seguro.</p>
<h3>Datos de Seguridad Química:</h3>
<ul>
    <li>Prácticamente TODAS las sustancias químicas pueden presentar un peligro físico o para la salud. LEA y SIGA las advertencias antes de usar.</li>
    <li>Las Hojas de Datos de Seguridad (SDS) brindan información detallada sobre los productos. La información de la SDS está disponible para todos los empleados.</li>
    <li>NUNCA mezcle sustancias químicas a menos que esté capacitado y autorizado. Mezclar un simple limpiador de cloro doméstico con amoníaco produce cloramina, un gas mortal. Evite el error de "más es mejor".</li>
</ul>`
            },
            {
                id: "iipp_driving",
                title: "Defensive Driving & Driver Safety / Conducción Segura",
                content_template: `<h2>15. Defensive Driving & Driver Safety</h2>
<p>Employees operating company or personal vehicles on company business must follow these safety guidelines:</p>
<ol>
    <li>NEVER drink and drive. NEVER use controlled substances (drugs) which impair sensory or motor skills.</li>
    <li>NEVER insist on the right of way. ALWAYS be courteous and give others the right of way.</li>
    <li>Inspect vehicle BEFORE driving. Check vehicle gears before starting. Never operate mechanically unsafe vehicles.</li>
    <li>ALWAYS drive posted speed limits, adjusted for weather conditions. Check mirrors. Always look behind when backing up.</li>
    <li>NEVER make a "conventional 3-point" U-turn in a commercial or residential street unless absolutely safe. Ruiz & Associates policy prefers executing subsequent right/left turns to complete the turnaround.</li>
    <li>NEVER drive without seat belts fastened. If equipped with lap and shoulder belts, both must be utilized.</li>
    <li>ALWAYS drive with headlights on (even during daytime) for visibility.</li>
    <li>ALWAYS maintain at least a 3-second following distance. Look ahead of the vehicle in front to anticipate maneuvers.</li>
    <li>ALWAYS pull over to the right to allow emergency vehicles with lights/sirens to pass.</li>
    <li>NEVER pick up hitchhikers or transport unauthorized non-employees.</li>
    <li>ALWAYS honk your horn when backing up. Check mirrors and look over your right shoulder. Think about "little people" (children) who are not easily visible.</li>
    <li>ALWAYS come to a complete stop at red lights and stop signs. ROLLING STOPS are prohibited.</li>
    <li>Any fine subsequent to a moving violation is the responsibility of the driver.</li>
    <li>ALWAYS secure cargo loads before transporting.</li>
</ol>
<p><strong>Personal Vehicle Use:</strong> If using a personal vehicle for company business, it must be insured according to California law. A certificate of insurance must be kept on file with the Safety Director, listing the company as an additional insured.</p>
<p><strong>CMV Drivers:</strong> All Commercial Motor Vehicle (CMV) drivers will participate in the company's Alcohol & Drug Program. All new CMV drivers will undergo a Pre-Employment Drug test prior to operating. Existing drivers are subject to Random, Reasonable Suspicion, Post-Accident, Return-to-Duty, and Follow-up testing.</p>`,
                content_template_es: `<h2>15. Manejo Defensivo y Seguridad del Conductor</h2>
<p>Los empleados que operen vehículos de la empresa o personales en asuntos de la empresa deben seguir estas pautas de seguridad:</p>
<ol>
    <li>NUNCA beba y conduzca. NUNCA use sustancias controladas (drogas) que afecten las habilidades sensoriales o motoras.</li>
    <li>NUNCA insista en el derecho de paso. SIEMPRE sea cortés y dé a otros el derecho de paso.</li>
    <li>Inspeccione el vehículo ANTES de conducir. Revise los cambios del vehículo antes de arrancar. Nunca opere vehículos mecánicamente inseguros.</li>
    <li>SIEMPRE conduzca a los límites de velocidad publicados, ajustados a las condiciones climáticas. Revise los espejos. Siempre mire hacia atrás al retroceder.</li>
    <li>NUNCA haga un giro en U "convencional de 3 puntos" en una calle comercial o residencial a menos que sea absolutamente seguro. La política de Ruiz & Associates prefiere realizar giros a la derecha/izquierda posteriores para completar el giro.</li>
    <li>NUNCA conduzca sin los cinturones de seguridad abrochados. Si está equipado con cinturones de regazo y hombro, se deben usar ambos.</li>
    <li>SIEMPRE conduzca con los faros encendidos (incluso durante el día) para mayor visibilidad.</li>
    <li>SIEMPRE mantenga al menos una distancia de seguimiento de 3 segundos. Mire hacia adelante del vehículo que está enfrente para anticipar maniobras.</li>
    <li>SIEMPRE oríllese a la derecha para permitir el paso de vehículos de emergencia con luces/sirenas.</li>
    <li>NUNCA recoja a personas que piden aventón (hitchhikers) ni transporte a personas no autorizadas que no sean empleados.</li>
    <li>SIEMPRE toque la bocina al retroceder. Revise los espejos y mire por encima de su hombro derecho. Piense en las "personas pequeñas" (niños) que no son fácilmente visibles.</li>
    <li>SIEMPRE deténgase por completo en los semáforos en rojo y en las señales de alto. Las PARADAS CONTINUAS (rolling stops) están prohibidas.</li>
    <li>Cualquier multa posterior a una infracción de tránsito es responsabilidad del conductor.</li>
    <li>SIEMPRE asegure las cargas antes de transportarlas.</li>
</ol>
<p><strong>Uso de Vehículos Personales:</strong> Si utiliza un vehículo personal para asuntos de la empresa, debe estar asegurado de acuerdo con la ley de California. Se debe mantener un certificado de seguro en el archivo del Director de Seguridad, que incluya a la empresa como asegurado adicional.</p>
<p><strong>Conductores de CMV:</strong> Todos los conductores de Vehículos Motorizados Comerciales (CMV) participarán en el Programa de Alcohol y Drogas de la empresa. Todos los nuevos conductores de CMV se someterán a una prueba de detección de drogas previa al empleo antes de operar. Los conductores existentes están sujetos a pruebas aleatorias, por sospecha razonable, posteriores a un accidente, de regreso al trabajo y de seguimiento.</p>`
            },
            {
                id: "iipp_ladder",
                title: "Ladder Safety / Seguridad con Escaleras",
                content_template: `<h2>16. Ladder Safety</h2>
<p>Ladders must be handled and used with caution to prevent falls, which can cause severe injuries or death:</p>
<ol>
    <li>Always check your ladder before using it. Check for broken rungs, split side rails, or damaged safety feet. Defective or broken ladders should be put out of service immediately and reported to your supervisor.</li>
    <li>Always utilize the correct ladder type and height for the job (wood, fiberglass, or aluminum).</li>
    <li>When climbing a ladder, always face forward, use both hands on the rails, and take one step at a time. Clean your boots or shoes before stepping onto the rungs.</li>
    <li>When working from a ladder, don’t over-reach. Always keep your belt buckle centered between the side rails.</li>
    <li>ALWAYS CHECK FOR OVERHEAD POWER LINES AND NEVER USE A METAL LADDER NEAR THEM.</li>
    <li>If using an extension or straight ladder, the base must be on an even, hard surface. Extend the ladder to the needed height and ensure extension hooks are securely engaged. It must extend 3 feet above the upper landing.</li>
    <li>Use the 1-to-4 rule to locate the base of the extension ladder: 1 foot of base width for every 4 feet of vertical height support.</li>
    <li>If the base is in a traffic area, rope it off and secure it to prevent shifting or bumps.</li>
    <li>Before using a stepladder, check that the spreader lock is working properly. Never stand on the top two steps.</li>
</ol>`,
                content_template_es: `<h2>16. Seguridad con Escaleras</h2>
<p>Las escaleras deben manipularse y utilizarse con precaución para evitar caídas, que pueden provocar lesiones graves o la muerte:</p>
<ol>
    <li>Revise siempre su escalera antes de usarla. Revise si hay peldaños rotos, rieles laterales divididos o patas de seguridad dañadas. Las escaleras defectuosas o rotas deben ponerse fuera de servicio de inmediato y reportarse a su supervisor.</li>
    <li>Utilice siempre el tipo y la altura de escalera correctos para el trabajo (madera, fibra de vidrio o aluminio).</li>
    <li>Al subir a una escalera, mire siempre hacia adelante, use ambas manos en los rieles y dé un paso a la vez. Limpie sus botas o zapatos antes de pisar los peldaños.</li>
    <li>Al trabajar desde una escalera, no se estire demasiado. Mantenga siempre la hebilla del cinturón centrada entre los rieles laterales.</li>
    <li>SIEMPRE VERIFIQUE SI HAY LÍNEAS ELÉCTRICAS AÉREAS Y NUNCA USE UNA ESCALERA DE METAL CERCA DE ELLAS.</li>
    <li>Si utiliza una escalera recta o de extensión, la base debe estar sobre una superficie nivelada y dura. Extienda la escalera a la altura necesaria y asegúrese de que los ganchos de extensión estén bien acoplados. Debe extenderse 3 pies por encima del rellano superior.</li>
    <li>Utilice la regla de 1 a 4 para ubicar la base de la escalera de extensión: 1 pie de ancho de base por cada 4 pies de altura de soporte vertical.</li>
    <li>Si la base está en una zona de tránsito, acordónela y asegúrela para evitar desplazamientos o golpes.</li>
    <li>Antes de usar una escalera de tijera, verifique que el seguro del separador funcione correctamente. Nunca se pare en los dos peldaños superiores.</li>
</ol>`
            },
            {
                id: "iipp_back_safety",
                title: "Back Safety & Lifting / Seguridad de la Espalda",
                content_template: `<h2>17. Back Safety and Lifting Safely</h2>
<p>Back injuries are painful and often result in long-term disability. Follow these guidelines to protect your back:</p>
<ol>
    <li>The most common causes of back pain are poor posture, poor physical condition, and repetitive trauma (repeating an irritating movement that accumulates micro-injuries).</li>
    <li>Body weight in your stomach and/or weight being lifted transfers an estimated 10 pounds of strain on your back.</li>
    <li><strong>The basics of good lifting include:</strong></li>
    <ul>
        <li>Size up the load before trying to lift it.</li>
        <li>Bend the knees; lift with your leg muscles, NOT your back.</li>
        <li>Always "push" a load; do not "pull." Pushing uses strong leg muscles.</li>
        <li>Do not twist or turn your body while executing the lift.</li>
        <li>Ensure you can carry the load to its destination before moving it.</li>
        <li>Set down your load gently; do not throw or drop it.</li>
    </ul>
    <li>Plan ahead. Ask for help to perform a proper lift. Split loads into smaller ones when possible.</li>
    <li>When using a partner to help lift, make sure only one person calls out the lift commands and directs the team.</li>
    <li>Use back supports or braces ONLY at the time you perform the lift. Wearing them snug during non-lifting activities can weaken back muscles.</li>
    <li>ALWAYS report back injuries, no matter how minor, to your immediate supervisor.</li>
</ol>`,
                content_template_es: `<h2>17. Seguridad de la Espalda y Levantamiento Seguro</h2>
<p>Las lesiones de espalda son dolorosas y a menudo provocan discapacidad a largo plazo. Siga estas pautas para proteger su espalda:</p>
<ol>
    <li>Las causas más comunes del dolor de espalda son la mala postura, la mala condición física y el traumatismo repetitivo (repetir un movimiento irritante que acumula microlesiones).</li>
    <li>El peso corporal en el abdomen y/o el peso que se levanta transfiere aproximadamente 10 libras de tensión a la espalda.</li>
    <li><strong>Los conceptos básicos para un buen levantamiento incluyen:</strong></li>
    <ul>
        <li>Evalúe el tamaño de la carga antes de intentar levantarla.</li>
        <li>Doble las rodillas; levante con los músculos de las piernas, NO con la espalda.</li>
        <li>Empuje siempre una carga; no la jale. Empujar utiliza los fuertes músculos de las piernas.</li>
        <li>No tuerza ni gire el cuerpo mientras realiza el levantamiento.</li>
        <li>Asegúrese de poder llevar la carga a su destino antes de intentar moverla.</li>
        <li>Deposite la carga con cuidado; no la tire ni la deje caer.</li>
    </ul>
    <li>Planifique con anticipación. Pida ayuda para realizar un levantamiento adecuado. Divida las cargas en otras más pequeñas cuando sea posible.</li>
    <li>Al usar a un compañero para ayudar a levantar, asegúrese de que solo una persona dé las órdenes de levantamiento y dirija el equipo.</li>
    <li>Use soportes o fajas lumbares SOLO en el momento de realizar el levantamiento. Usarlas ajustadas durante actividades en las que no se levanta peso puede debilitar los músculos de la espalda.</li>
    <li>REPORTE SIEMPRE las lesiones de espalda, por leves que sean, a su supervisor inmediato.</li>
</ol>`
            },
            {
                id: "iipp_slips_trips",
                title: "Slips, Trips & Falls / Resbalones y Caídas",
                content_template: `<h2>18. Slips, Trips and Falls</h2>
<p>Prevent slips, trips, and falls by practicing caution and maintaining clean work environments:</p>
<ol>
    <li>The physical forces at work in a fall are friction, momentum, and gravity.</li>
    <li>Slips, trips, and falls are most likely to happen when you are running, wearing inappropriate shoes, or not paying attention.</li>
    <li>All spills should be cleaned up right away, regardless of who caused them. Avoid "I didn't do it" attitudes.</li>
    <li>Do not let grease or debris accumulate on floors, especially around machinery. Be extra cautious on smooth surfaces and on wet or rainy days.</li>
    <li>Make sure your footwear matches the working conditions of your job.</li>
    <li>Post signs or place barricades to warn others of a wet surface.</li>
    <li>Trips occur when your foot hits an object and your momentum throws you off balance. Avoid cluttered work areas, poor lighting, or loose footing.</li>
    <li>Arrange furniture and equipment so that walkways remain clear.</li>
    <li>Extension or power cords are major tripping hazards. Tape them down or route them out of pedestrian paths.</li>
</ol>`,
                content_template_es: `<h2>18. Resbalones, Tropezones y Caídas</h2>
<p>Evite resbalones, tropezones y caídas teniendo precaución y manteniendo entornos de trabajo limpios:</p>
<ol>
    <li>Las fuerzas físicas que actúan en una caída son la fricción, el impulso y la gravedad.</li>
    <li>Es más probable que ocurran resbalones, tropezones y caídas cuando corre, usa zapatos inadecuados o no presta atención.</li>
    <li>Todos los derrames deben limpiarse de inmediato, independientemente de quién los haya causado. Evite las actitudes de "yo no lo hice".</li>
    <li>No permita que se acumule grasa o suciedad en los pisos, especialmente alrededor de la maquinaria. Tenga mucho cuidado en superficies lisas y en días húmedos o lluviosos.</li>
    <li>Asegúrese de que su calzado coincida con las condiciones de trabajo de su empleo.</li>
    <li>Coloque carteles o coloque barricadas para advertir a otros sobre una superficie mojada.</li>
    <li>Los tropezones ocurren cuando el pie golpea un objeto y el impulso lo desequilibra. Evite áreas de trabajo desordenadas, iluminación deficiente o pisadas inestables.</li>
    <li>Organice los muebles y el equipo de modo que los pasillos permanezcan despejados.</li>
    <li>Los cables de extensión o de herramientas eléctricas son peligros importantes de tropiezo. Péguelos con cinta adhesiva o diríjalos fuera de las rutas peatonales.</li>
</ol>`
            },
            {
                id: "iipp_office",
                title: "Office Safety / Seguridad en la Oficina",
                content_template: `<h2>19. Office Safety</h2>
<p>Office workers are exposed to safety hazards that can be mitigated through good safety practices:</p>
<ol>
    <li>Practice safe walking skills. On wet surfaces, take short steps and keep your center of balance under you. Move slowly.</li>
    <li>Clean up spills immediately. Waxed floors can be very slippery.</li>
    <li>Wear appropriate shoes. High heels are more likely to cause slips or twisted ankles compared to flat shoes.</li>
    <li>When carrying objects, ensure your line of sight is not blocked. Keep your work area well lit.</li>
    <li>Keep your area clean. Do not clutter aisles or stairs. Store materials in closets, file cabinets, or desks. Do NOT store materials inside Electrical Rooms, near heaters, or other heat sources.</li>
    <li>When using stairs, use the handrails at all times. Do not run or jump on stairs. Report broken stair treads or loose handrails immediately.</li>
    <li>Always use a proper ladder or step stool to obtain objects beyond your reach. Never use a wheeled swivel chair as a makeshift ladder.</li>
    <li>Dispose of broken glass carefully. Wrap sharp pieces in protective paper before putting them in the wastebasket.</li>
</ol>`,
                content_template_es: `<h2>19. Seguridad en la Oficina</h2>
<p>Los trabajadores de oficina están expuestos a riesgos de seguridad que pueden mitigarse mediante buenas prácticas:</p>
<ol>
    <li>Practique habilidades para caminar seguro. En superficies mojadas, dé pasos cortos y mantenga su centro de gravedad bajo usted. Muévase lentamente.</li>
    <li>Limpie los derrames de inmediato. Los pisos encerados pueden ser muy resbaladizos.</li>
    <li>Use zapatos adecuados. Es más probable que los tacones altos causen resbalones o torceduras de tobillo en comparación con los zapatos planos.</li>
    <li>Al transportar objetos, asegúrese de que su línea de visión no esté bloqueada. Mantenga su área de trabajo bien iluminada.</li>
    <li>Mantenga su área limpia. No obstruya los pasillos ni las escaleras. Guarde los materiales en armarios, archivadores o escritorios. NO guarde materiales dentro de salas eléctricas, cerca de calentadores u otras fuentes de calor.</li>
    <li>Al usar escaleras, use los pasamanos en todo momento. No corra ni salte en las escaleras. Reporte de inmediato los peldaños rotos o los pasamanos flojos.</li>
    <li>Use siempre una escalera adecuada o un taburete para alcanzar objetos que estén fuera de su alcance. Nunca use una silla giratoria con ruedas como escalera improvisada.</li>
    <li>Deseche los vidrios rotos con cuidado. Envuelva las piezas afiladas en papel protector antes de tirarlas al cesto de basura.</li>
</ol>`
            },
            {
                id: "iipp_flammable",
                title: "Flammable Materials / Materiales Inflamables",
                content_template: `<h2>20. Flammable & Combustible Materials</h2>
<p>Flammable liquids can present serious fire and health hazards if not managed correctly:</p>
<ol>
    <li>Always read the SDS on the flammable and/or combustible liquids you handle to familiarize yourself with hazards, PPE, and first aid.</li>
    <li>Always handle and store flammable liquids in containers designed for them. Never use unauthorized secondary containers. DO NOT store flammable liquids inside plastic containers; only use UL-approved metal safety cans.</li>
    <li>Never utilize flammable liquids in enclosed areas without proper ventilation, or around open flames, sparks, heaters, and other heat sources.</li>
    <li>Always utilize proper PPE.</li>
    <li>Ensure all containers holding flammables are clearly labeled. Never remove warning labels.</li>
    <li>Never leave flammable or combustible liquids unattended. If leaving your work area, store them safely.</li>
    <li>Never smoke, eat, or drink when handling flammables. Always wash hands before eating or using the restroom after handling flammables.</li>
    <li>Always clean up spills immediately using spark-free tools. Dispose of waste according to local guidelines.</li>
</ol>`,
                content_template_es: `<h2>20. Materiales Inflamables y Combustibles</h2>
<p>Los líquidos inflamables pueden presentar graves peligros de incendio y para la salud si no se manejan correctamente:</p>
<ol>
    <li>Lea siempre la SDS de los líquidos inflamables y/o combustibles que manipule para familiarizarse con los peligros, el PPE y los primeros auxilios.</li>
    <li>Manipule y almacene siempre los líquidos inflamables en recipientes diseñados para ellos. Nunca use contenedores secundarios no autorizados. NO almacene líquidos inflamables en recipientes de plástico; use únicamente latas de seguridad metálicas aprobadas por UL.</li>
    <li>Nunca utilice líquidos inflamables en áreas cerradas sin la ventilación adecuada, o cerca de llamas abiertas, chispas, calentadores u otras fuentes de calor.</li>
    <li>Utilice siempre el PPE adecuado.</li>
    <li>Asegúrese de que todos los recipientes que contengan inflamables estén claramente etiquetados. Nunca quite las etiquetas de advertencia.</li>
    <li>Nunca deje líquidos inflamables o combustibles desatendidos. Si sale de su área de trabajo, guárdelos de forma segura.</li>
    <li>Nunca fume, coma ni beba cuando manipule inflamables. Lávese siempre las manos antes de comer o usar el baño después de manipular inflamables.</li>
    <li>Limpie siempre los derrames de inmediato con herramientas que no generen chispas. Deseche los residuos de acuerdo con las directrices locales.</li>
</ol>`
            },
            {
                id: "iipp_ppe",
                title: "Personal Protective Equipment / Equipo de Protección (PPE)",
                content_template: `<h2>21. Personal Protective Equipment (PPE)</h2>
<p><strong>Eye and Face Protection:</strong> Employees must understand when and what eye/face protection is necessary, how to wear it, its limitations, and proper care. Proper eye protection reduces the chance and severity of injury.</p>
<p>The following hazards pose danger to eye/face safety: injurious gases, vapors, acids, caustics, dusts, powders, mists, flying particles/objects, splashing metal, and thermal/radiation hazards (such as welding glare, UV/IR rays).</p>
<p>When engineering controls do not provide total protection, PPE must be used. Workstations must have appropriate ventilation and lighting.</p>
<p><strong>Emergency Eyewash:</strong> Employees must know the location and operation of eyewash facilities. The first 15 seconds after an eye injury is critical. Eyewash stations must be available within 100 feet or a 10-second walk of hazard areas. If a foreign object enters the eye, flush with water immediately. Do not rub the eye. Report all injuries to management immediately.</p>`,
                content_template_es: `<h2>21. Equipo de Protección Personal (PPE)</h2>
<p><strong>Protección para Ojos y Cara:</strong> Los empleados deben comprender cuándo y qué protección para ojos/cara es necesaria, cómo usarla, sus limitaciones y su cuidado adecuado. La protección ocular adecuada reduce la posibilidad y la gravedad de las lesiones.</p>
<p>Los siguientes peligros plantean riesgos para la seguridad de los ojos y la cara: gases nocivos, vapores, ácidos, cáusticos, polvos, neblinas, partículas/objetos voladores, salpicaduras de metal y peligros térmicos/de radiación (como el resplandor de la soldadura, rayos UV/IR).</p>
<p>Cuando los controles de ingeniería no brindan protección total, se debe utilizar PPE. Las estaciones de trabajo deben tener ventilación e iluminación adecuadas.</p>
<p><strong>Lavado de Ojos de Emergencia:</strong> Los empleados deben conocer la ubicación y el funcionamiento de las instalaciones de lavado de ojos. Los primeros 15 segundos después de una lesión ocular son fundamentales. Las estaciones de lavado de ojos deben estar disponibles dentro de los 100 pies o a 10 segundos de caminata de las áreas de peligro. Si entra un objeto extraño en el ojo, enjuáguelo con agua de inmediato. No se frote el ojo. Reporte todas las lesiones a la gerencia de inmediato.</p>`
            }
        ]
    },
    {
        id: "hipp",
        name: "Heat Illness Prevention Plan",
        abbreviation: "HIPP",
        content_template: `<h1>Indoor / Outdoor Heat Illness Prevention Procedures</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Effective Date:</strong> {{effective_date}}</p>
<div style="font-size: 1.1rem; font-weight: 600; color: #475569; margin-bottom: 20px;">In compliance with California Code of Regulations, Title 8, Section 3395 & 3396</div>
<table style="width:100%; border-collapse:collapse; margin-bottom:20px;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Name / Nombre</th>
            <th>Title / Título</th>
            <th>Phone Number / Teléfono</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{safety_officer}}</td>
            <td>Safety Director / Director de Seguridad</td>
            <td>{{safety_officer_phone}}</td>
        </tr>
    </tbody>
</table>
<p>This program applies to all indoor and outdoor work activities at {{client_name}} where environmental risk factors for heat illness are present. Under the direction of {{safety_officer}}, measures are established to provide water, shade, and rest breaks in compliance with Cal/OSHA requirements.</p>`,
        content_template_es: `<h1>Procedimientos de Prevención de Enfermedades por Calor en Interiores y Exteriores</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<div style="font-size: 1.1rem; font-weight: 600; color: #475569; margin-bottom: 20px;">De conformidad con el Título 8 del Código de Regulaciones de California, Secciones 3395 y 3396</div>
<table style="width:100%; border-collapse:collapse; margin-bottom:20px;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Nombre / Name</th>
            <th>Título / Title</th>
            <th>Teléfono / Phone Number</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{safety_officer}}</td>
            <td>Director de Seguridad / Safety Director</td>
            <td>{{safety_officer_phone}}</td>
        </tr>
    </tbody>
</table>
<p>Este programa se aplica a todas las actividades de trabajo en interiores y exteriores en {{client_name}} donde existan factores de riesgo ambiental de enfermedad por calor. Bajo la dirección de {{safety_officer}}, se establecen medidas para proporcionar agua, sombra y descansos de conformidad con los requisitos de Cal/OSHA.</p>`,
        subsections: [
            {
                id: "hipp_water",
                title: "Provision of Water / Suministro de Agua",
                content_template: `<h2>Section 1 - Procedures for Provision of Water</h2>
<p><strong>1.1</strong> - The Supervisor is responsible for providing drinking water containers to the site, so that at least 2 gallons per employee are available at the start of the shift. At times he may assign another employee to assist him with providing cool cans, providing disposable cups, checking on drinking water levels, and replenishing drinking water when necessary.</p>
<p><strong>1.2</strong> – The Supervisor will provide disposable cups and the necessary cup dispensers to ensure that enough disposable cups are made available for each worker and are kept clean until used.</p>
<p><strong>1.3</strong> – As part of {{client_name}}'s Effective Replenishment Procedures, the water level of all containers will be checked every hour and more frequently, for example every 30 minutes, when the temperature exceeds 95°F. When the water level within a container drops below 50%, water containers will be refilled with cool water. To accomplish this task, the Supervisor may carry additional water containers or purchase water as needed. He may also assign another employee to assist in replenishing water.</p>
<p><strong>1.3.1</strong> – Water will be fresh, pure, and suitably cool and provided to employees free of charge. The supervisor will visually examine the water and pour some on his skin to ensure that the water is suitably cool. During hot weather, the water must be cooler than the ambient temperature but not so cool as to cause discomfort.</p>
<p><strong>1.3.2</strong> – Water containers shall be placed closer to employees than shade structures. If any employees are working across large areas, the water will be placed in multiple locations.</p>
<p><strong>1.3.3</strong> – All water containers will be kept in sanitary condition. Water from non-approved or non-tested water sources is not acceptable.</p>
<p><strong>1.4</strong> – When the temperature equals or exceeds 95 degrees or during a heat wave, a pre-shift meeting will be conducted to encourage employees to drink plenty of water and remind employees of their right to take a cool-down rest when necessary, and to identify signs and symptoms of heat illness.</p>
<p><strong>1.5</strong> – The Supervisor will check the work site and place the water as close as practicable to the areas where employees are working. If field terrain prevents the water from being placed as close as possible to the workers, the Supervisor will bring bottled water or individual containers, and these will be adequately identified to eliminate the possibility of drinking from a co-worker's container or bottle.</p>
<p><strong>1.6</strong> – The Supervisor will ensure that the water containers are relocated to follow along as the crew moves, so drinking water will be readily accessible.</p>
<p><strong>1.7</strong> – The Supervisor will be responsible for cleaning the water containers and ensuring that they are kept in sanitary condition.</p>
<p><strong>1.8</strong> – {{client_name}} will reimburse the supervisors for any cost incurred for them to fill up their water containers as needed on a daily basis or to purchase necessary disposable cups or cleaning supplies.</p>
<p><strong>1.9</strong> – The Supervisor will point out daily the location of the water coolers to the workers and remind them to drink water frequently.</p>
<p><strong>1.10</strong> – When the temperature equals or exceeds 95 degrees F or during a heat wave, the Supervisor will increase the number of water breaks, and will remind workers throughout the work shift to drink water.</p>
<p><strong>1.11</strong> – During employee training, the importance of frequent drinking of water will be stressed.</p>`,
                content_template_es: `<h2>Sección 1 - Procedimientos para el Suministro de Agua</h2>
<p><strong>1.1</strong> - El Supervisor es responsable de proveer contenedores de agua potable al sitio, de modo que al menos 2 galones por empleado estén disponibles al inicio del turno. En ocasiones, puede asignar a otro empleado para que le ayude a proporcionar latas frías, vasos desechables, verificar los niveles de agua potable y reabastecer el agua potable cuando sea necesario.</p>
<p><strong>1.2</strong> – El Supervisor proporcionará vasos desechables y los dispensadores de vasos necesarios para garantizar que haya suficientes vasos desechables disponibles para cada trabajador y que se mantengan limpios hasta su uso.</p>
<p><strong>1.3</strong> – Como parte de los Procedimientos Efectivos de Reabastecimiento de {{client_name}}, el nivel de agua de todos los contenedores se verificará cada hora y con más frecuencia, por ejemplo cada 30 minutos, cuando la temperatura supere los 95°F. Cuando el nivel de agua dentro de un contenedor caiga por debajo del 50%, los contenedores de agua se rellenarán con agua fría. Para lograr esta tarea, el Supervisor puede llevar contenedores de agua adicionales o comprar agua según sea necesario. También puede asignar a otro empleado para que ayude a reabastecer el agua.</p>
<p><strong>1.3.1</strong> – El agua será fresca, pura y adecuadamente fría y se proporcionará a los empleados de forma gratuita. El supervisor examinará visualmente el agua y verterá un poco sobre su piel para asegurarse de que el agua esté adecuadamente fría. Durante el clima cálido, el agua debe estar más fría que la temperatura ambiente, pero no tanto como para causar molestias.</p>
<p><strong>1.3.2</strong> – Los contenedores de agua deben colocarse más cerca de los empleados que las estructuras de sombra. Si hay empleados trabajando en áreas grandes, el agua se colocará en múltiples ubicaciones.</p>
<p><strong>1.3.3</strong> – Todos los contenedores de agua se mantendrán en condiciones sanitarias. No es aceptable el agua proveniente de fuentes de agua no aprobadas o no probadas.</p>
<p><strong>1.4</strong> – Cuando la temperatura sea igual o supere los 95 grados o durante una ola de calor, se llevará a cabo una reunión previa al turno para alentar a los empleados a beber abundante agua y recordarles su derecho a tomar un descanso de enfriamiento cuando sea necesario, y para identificar signos y síntomas de enfermedades por calor.</p>
<p><strong>1.5</strong> – El Supervisor inspeccionará el sitio de trabajo y colocará el agua lo más cerca posible de las áreas donde los empleados estén trabajando. Si el terreno del campo impide que el agua se coloque lo más cerca posible de los trabajadores, el Supervisor traerá agua embotellada o contenedores individuales, y estos estarán adecuadamente identificados para eliminar la posibilidad de beber del contenedor o botella de un compañero de trabajo.</p>
<p><strong>1.6</strong> – El Supervisor se asegurará de que los contenedores de agua se reubiquen para seguir a la cuadrilla a medida que se mueve, de modo que el agua potable esté fácilmente accesible.</p>
<p><strong>1.7</strong> – El Supervisor será responsable de limpiar los contenedores de agua y asegurarse de que se mantengan en condiciones sanitarias.</p>
<p><strong>1.8</strong> – {{client_name}} reembolsará a los supervisores cualquier costo incurrido para llenar sus contenedores de agua según sea necesario diariamente o para comprar los vasos desechables o suministros de limpieza necesarios.</p>
<p><strong>1.9</strong> – El Supervisor señalará diariamente la ubicación de los enfriadores de agua a los trabajadores y les recordará beber agua con frecuencia.</p>
<p><strong>1.10</strong> – Cuando la temperatura sea igual o supere los 95 grados F o durante una ola de calor, el Supervisor aumentará el número de descansos para tomar agua y recordará a los trabajadores a lo largo del turno de trabajo que beban agua.</p>
<p><strong>1.11</strong> – Durante la capacitación de los empleados, se enfatizará la importancia de beber agua con frecuencia.</p>`
            },
            {
                id: "hipp_shade",
                title: "Access to Shade & Document 2-A / Acceso a Sombra y Documento 2-A",
                content_template: `<h2>Section 2 - Access to Shade</h2>
<p><strong>2.1</strong> – Shade will be present when the temperature exceeds 80° F. When necessary, the Supervisor will provide shade structures for the site. The shade structures will at least accommodate the number of employees who are on recovery or rest periods, so that they can sit in a normal posture fully in the shade without having to be in physical contact with each other. During meal periods there will be enough shade for all the employees who choose to remain in the general area of work or in areas designated for recovery and rest periods. If necessary, we may need to rotate employees in and out of meal periods, as with recovery and rest periods.</p>
<p><strong>2.2</strong> – The Supervisor will ensure that shade structures are located as close as practicable to the areas where employees are working, when the temperature exceeds 80° F. When temperatures do not exceed 80°F, the shade structures will still be made available and set in place upon worker(s) request.</p>
<p><em>Note: {{client_name}} understands that the interior of a vehicle may not be used to provide shade unless the vehicle is air-conditioned and the air conditioner is on.</em></p>
<p><strong>2.3</strong> – The Supervisor will point out the daily location of the shade structures to the workers as well as allow and encourage employees to take a 5-minute cool-down rest in the shade when they feel the need to do so to protect themselves from overheating. Any employee who takes a preventative cool down rest break will be monitored and asked if he or she is experiencing symptoms of heat illness. No employee will be ordered back to work until signs or symptoms of heat illness have abated.</p>
<p><strong>2.4</strong> – The Supervisor will ensure that the shade structures are relocated to follow along with the crew and double-check that they are as close as practical to the employees, so that access to shade is provided at all times. Employees are free to adjust shade structures closer if they feel that this is more practical. All employees on a recovery, rest break or meal period will have full access to shade so they can sit in a normal posture without having to be in physical contact with each other.</p>
<p><strong>2.5</strong> – In situations where trees or other vegetation are used to provide shade the Supervisor will evaluate the thickness and shape of the shaded area (given the changing angles of the sun during the entire shift), before assuming that sufficient shadow is being cast to protect employees.</p>
<p><strong>SPECIAL NOTE:</strong> In situations where it is not safe to provide shade (such as when there are high winds), the Supervisor will document how this determination was made, and what steps will be taken to provide shade upon request or other alternative cooling measures with equivalent protection.</p>

<div style="border: 2px dashed #cbd5e1; background: #f8fafc; padding: 20px; margin-top: 20px; border-radius: 8px;">
    <h3 style="margin-top: 0; text-align: center;">Document 2-A - When it is Unsafe to Provide Shade</h3>
    <p style="font-size: 0.9rem; color: #64748b; text-align: center;">(This document is only to be used when providing shade would cause possible injuries due to environmental issues such as high winds, verified through TV, Radio, or Internet)</p>
    <p><strong>Name of Supervisor:</strong> ________________________________</p>
    <ol>
        <li>In this situation and worksite, why is it unsafe to provide shade to workers?<br>__________________________________________________________________</li>
        <li>What evidence do you know of that makes it unsafe to provide shade?<br>__________________________________________________________________</li>
        <li>What measures will be taken if/when an employee requests access to shade? How will water be provided?<br>__________________________________________________________________</li>
        <li>Have you conferred with upper management to approve this temporary measure? Who gave final approval?<br>__________________________________________________________________</li>
        <li>Is there any other pertinent information that needs to be documented regarding this situation?<br>__________________________________________________________________</li>
    </ol>
</div>`,
                content_template_es: `<h2>Sección 2 - Acceso a la Sombra</h2>
<p><strong>2.1</strong> – Habrá sombra cuando la temperatura supere los 80° F. Cuando sea necesario, el Supervisor proporcionará estructuras de sombra para el sitio. Las estructuras de sombra acomodarán al menos al número de empleados que estén en períodos de recuperación o descanso, de modo que puedan sentarse en una postura normal completamente en la sombra sin tener que estar en contacto físico entre sí. Durante los períodos de comida habrá suficiente sombra para todos los empleados que elijan permanecer en el área general de trabajo o en las áreas designadas para los períodos de recuperación y descanso. Si es necesario, es posible que debamos rotar a los empleados para tomar sus períodos de comida, al igual que con los períodos de recuperación y descanso.</p>
<p><strong>2.2</strong> – El Supervisor se asegurará de que las estructuras de sombra estén ubicadas lo más cerca posible de las áreas donde los empleados estén trabajando, cuando la temperatura supere los 80° F. Cuando las temperaturas no superen los 80°F, las estructuras de sombra se pondrán a disposición y se colocarán en su lugar a solicitud del trabajador o trabajadores.</p>
<p><em>Nota: {{client_name}} entiende que el interior de un vehículo no se puede utilizar para proporcionar sombra a menos que el vehículo tenga aire acondicionado y el aire acondicionado esté encendido.</em></p>
<p><strong>2.3</strong> – El Supervisor señalará la ubicación diaria de las estructuras de sombra a los trabajadores, y permitirá y alentará a los empleados a tomar un descanso preventivo de enfriamiento de 5 minutos en la sombra cuando sientan la necesidad de hacerlo para protegerse del sobrecalentamiento. Cualquier empleado que tome un descanso preventivo de enfriamiento será monitoreado y se le preguntará si está experimentando síntomas de enfermedad por calor. A ningún empleado se le ordenará regresar al trabajo hasta que los signos o síntomas de la enfermedad por calor hayan disminuido.</p>
<p><strong>2.4</strong> – El Supervisor se asegurará de que las estructuras de sombra se reubiquen para seguir a la cuadrilla y verificará dos veces que estén lo más cerca posible de los empleados, de modo que se proporcione acceso a la sombra en todo momento. Los empleados tienen la libertad de ajustar las estructuras de sombra más cerca si sienten que es más práctico. Todos los empleados en un período de recuperación, descanso o comida tendrán acceso completo a la sombra para que puedan sentarse en una postura normal sin tener que estar en contacto físico entre sí.</p>
<p><strong>2.5</strong> – En situaciones donde se utilicen árboles u otra vegetación para proporcionar sombra, el Supervisor evaluará el espesor y la forma del área sombreada (dados los ángulos cambiantes del sol durante todo el turno), antes de asumir que se está proyectando suficiente sombra para proteger a los empleados.</p>
<p><strong>NOTA ESPECIAL:</strong> En situaciones donde no sea seguro proporcionar sombra (como cuando hay vientos fuertes), el Supervisor documentará cómo se tomó esta determinación y qué pasos se tomarán para proporcionar sombra a solicitud u otras medidas de enfriamiento alternativas con protección equivalente.</p>

<div style="border: 2px dashed #cbd5e1; background: #f8fafc; padding: 20px; margin-top: 20px; border-radius: 8px;">
    <h3 style="margin-top: 0; text-align: center;">Documento 2-A - Cuando no es Seguro Proporcionar Sombra</h3>
    <p style="font-size: 0.9rem; color: #64748b; text-align: center;">(Este documento solo debe utilizarse cuando proporcionar sombra causaría posibles lesiones debido a problemas ambientales como vientos fuertes, verificado a través de la televisión, la radio o el Internet)</p>
    <p><strong>Nombre del Supervisor:</strong> ________________________________</p>
    <ol>
        <li>En esta situación y sitio de trabajo, ¿por qué no es seguro proporcionar sombra a los trabajadores?<br>__________________________________________________________________</li>
        <li>¿Qué evidencia conoce que haga que no sea seguro proporcionar sombra?<br>__________________________________________________________________</li>
        <li>¿Qué medidas se tomarán cuando un empleado solicite acceso a la sombra? ¿Cómo se proporcionará el agua?<br>__________________________________________________________________</li>
        <li>¿Ha consultado con la alta gerencia para aprobar esta medida temporal? ¿Quién dio la aprobación final?<br>__________________________________________________________________</li>
        <li>¿Hay alguna otra información pertinente que deba documentarse con respecto a esta situación?<br>__________________________________________________________________</li>
    </ol>
</div>`
            },
            {
                id: "hipp_weather",
                title: "Monitoring the Weather / Monitoreo del Clima",
                content_template: `<h2>Section 3 - Monitoring the Weather</h2>
<p><strong>3.1</strong> – {{client_name}} will monitor predicted weather temperatures in advance by television, radio, or on the Internet to know when the temperature will exceed 80 degrees and to know whether a heat wave is expected. This will assist in planning in advance the work schedule and scheduling work modifications if necessary. This type of advance planning should take place all summer long. We will train and instruct our supervisors to check in advance the extended weather forecast. We will monitor the weather through one of the following means:</p>
<ul>
    <li><strong>Internet:</strong> www.nws.noaa.gov</li>
    <li><strong>National Weather Service Phone Numbers:</strong> San Diego (858) 675-8706 (#1)</li>
    <li><strong>The Weather Channel mobile application</strong></li>
</ul>
<p><strong>3.2</strong> – Prior to each workday, the Supervisor will review the forecasted temperature and humidity for the worksite and compare it against the National Weather Service Heat Index to evaluate the risk level for heat illness, for instance whether or not workers will be exposed to temperatures and humidity characterized as either "extreme caution" or "extreme danger." It is important to keep in mind that the temperature at which these warnings occur must be lowered by as much as 15 degrees if the workers are in direct sunlight.</p>
<p><strong>3.3</strong> – The weather forecast information will be taken into consideration to determine when it will be necessary to make modifications to the work schedule (such as stopping work early, rescheduling the job, working at night or during the cooler hours of the day, and increasing the number of water and rest breaks).</p>
<p><strong>3.4</strong> – The Supervisor will be responsible for checking the temperature hourly to monitor for sudden increases in temperature, to ensure that once the temperature exceeds 80°F that shade structures are opened and accessible, and to make certain that if the temperature equals or exceeds 95°F that High Heat Procedures are implemented.</p>`,
                content_template_es: `<h2>Sección 3 - Monitoreo del Clima</h2>
<p><strong>3.1</strong> – {{client_name}} monitoreará las temperaturas previstas del clima con anticipación por televisión, radio o por Internet para saber cuándo la temperatura superará los 80 grados y saber si se espera una ola de calor. Esto ayudará a planificar con anticipación el horario de trabajo y programar modificaciones de trabajo si es necesario. Este tipo de planificación anticipada debe llevarse a cabo durante todo el verano. Capacitaremos e instruiremos a nuestros supervisores para que verifiquen con anticipación el pronóstico del clima extendido. Monitorearemos el clima a través de uno de los siguientes medios:</p>
<ul>
    <li><strong>Internet:</strong> www.nws.noaa.gov</li>
    <li><strong>Números de Teléfono del Servicio Meteorológico Nacional:</strong> San Diego (858) 675-8706 (#1)</li>
    <li><strong>La aplicación móvil de The Weather Channel</strong></li>
</ul>
<p><strong>3.2</strong> – Antes de cada jornada laboral, el Supervisor revisará la temperatura y la humedad pronosticadas para el lugar de trabajo y las comparará con el Índice de Calor del Servicio Meteorológico Nacional para evaluar el nivel de riesgo de enfermedad por calor, por ejemplo, si los trabajadores estarán expuestos o no a una temperatura y humedad caracterizadas como "precaución extrema" o "peligro extremo". Es importante tener en cuenta que la temperatura a la que ocurren estas advertencias debe reducirse hasta en 15 grados si los trabajadores en cuestión están bajo la luz solar directa.</p>
<p><strong>3.3</strong> – La información del pronóstico del clima se tomará en consideración para determinar cuándo será necesario realizar modificaciones en el horario de trabajo (como terminar el trabajo temprano, reprogramar el trabajo, trabajar de noche o durante las horas más frescas del día, y aumentar el número de descansos para tomar agua y descansar).</p>
<p><strong>3.4</strong> – El Supervisor será responsable de verificar la temperatura cada hora para monitorear aumentos repentinos, asegurar que una vez que la temperatura supere los 80°F las estructuras de sombra estén abiertas y accesibles para los trabajadores, y asegurarse de que si la temperatura es igual o supera los 95°F se implementen los Procedimientos para Calor Extremo.</p>`
            },
            {
                id: "hipp_highheat",
                title: "Heat Wave & High Heat Procedures / Olas de Calor y Calor Extremo",
                content_template: `<h2>Section 4 - Handling a Heat Wave & High Heat Procedures</h2>
<p><strong>4.1</strong> – During a heat wave the workday will be adjusted and/or some jobs will be rescheduled or possibly ceased for the day. A heat wave is any day in which the predicted high temperature for the day will be at least 80 degrees Fahrenheit and at least ten degrees Fahrenheit higher than the average high daily temperature in the preceding five days.</p>
<p><strong>4.2</strong> – If schedule modifications are not possible and workers have to work during a heat wave, the Supervisor will conduct a tailgate meeting to reinforce heat illness prevention and emergency response procedures. In addition, the Supervisor will institute alternative preventive measures such as providing workers with an increased number of water and rest breaks every hour, supervising workers to ensure they take these breaks, and observing closely all workers for signs of heat illness.</p>
<p><strong>4.3</strong> – At the start of the workday during a heat wave, the Supervisor will hold a tailgate meeting with the workers to review heat illness prevention procedures, the weather forecast, and the emergency response plan.</p>
<p><strong>4.4</strong> – The Supervisor will assign each employee a "buddy" to look out for signs of heat illness and ensure emergency procedures are initiated if someone displays symptoms.</p>
<p><strong>4.4.1</strong> – New employees during their first two weeks will be monitored closely to observe their acclimatization. Either the supervisor or a designated employee will monitor them and try to lessen the intensity of work during a heat wave.</p>

<h3>High Heat Procedures (Triggered at 95°F or Higher)</h3>
<p><strong>4.5</strong> – When the temperature equals or exceeds 95°F, the Supervisor shall be extra vigilant by observing and monitoring employees through one of the following means:</p>
<ul>
    <li>The supervisor or an employee designated by him will observe 20 or fewer employees.</li>
    <li>A mandatory buddy system will be implemented.</li>
    <li>For employees working alone, the supervisor will check on them hourly by radio or cellular phone.</li>
    <li>Electronic devices (mobile phone, radio) may be used only if reception in the area is reliable.</li>
</ul>
<p><strong>4.6</strong> – High heat procedures will include designating one or more employees on each worksite as authorized to call for emergency medical services and allowing other employees to call when no designated employee is available.</p>
<p><strong>4.7</strong> – The Supervisor will remind employees throughout the work shift to drink plenty of water.</p>
<p><strong>4.8</strong> – The Supervisor will conduct a pre-shift meeting before the start of work to review high heat procedures, encourage hydration, and remind employees of their right to take cool-down rests. For remote employees, this may be conducted via cell phone or radio.</p>
<p><strong>4.9</strong> – When temperatures reach 95°F or above, employees are required to take a minimum 10-minute net preventative cool-down rest period every two hours. This is mandatory. Additional rest periods are required at the conclusion of the eighth and tenth hour if the workday extends that long. These rest periods must be documented.</p>

<div style="border: 2px dashed #cbd5e1; background: #f8fafc; padding: 20px; margin-top: 20px; border-radius: 8px;">
    <h3 style="margin-top: 0; text-align: center;">Document 4-A - Required Rest Period Record</h3>
    <p style="font-size: 0.9rem; color: #64748b; text-align: center;">When temperatures reach 95 degrees or above, employees must take a minimum 10-minute net preventative cool-down rest period every two hours. Record times below:</p>
    <table style="width:100%; border-collapse:collapse; background:white; margin-top:10px;" border="1" cellpadding="6">
        <thead>
            <tr style="background:#f1f5f9;">
                <th style="width:10%;">No.</th>
                <th style="width:50%;">Employee Name / Nombre en Letra de Molde</th>
                <th style="width:40%;">Time Rest Period Taken / Hora del Descanso</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>1</td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td></tr>
        </tbody>
    </table>
    <p style="font-size: 0.8rem; color: #64748b; margin-top: 10px;">* Photocopy as needed for larger crews. Keep on file for inspection.</p>
</div>`,
                content_template_es: `<h2>Sección 4 - Manejo de una Ola de Calor y Procedimientos para Calor Extremo</h2>
<p><strong>4.1</strong> – Durante una ola de calor, la jornada laboral se ajustará y/o algunos trabajos se reprogramarán o posiblemente se suspenderán por el día. Una ola de calor es cualquier día en el que la temperatura máxima prevista sea de al menos 80 grados Fahrenheit y al menos de diez grados Fahrenheit más alta que el promedio de temperatura máxima diaria en los cinco días anteriores.</p>
<p><strong>4.2</strong> – Si las modificaciones de horario no son posibles y los trabajadores tienen que trabajar durante una ola de calor, el Supervisor llevará a cabo una reunión de seguridad para reforzar la prevención de enfermedades por calor y los procedimientos de respuesta de emergencia. Además, el Supervisor instituirá medidas preventivas alternativas, como proporcionar a los trabajadores un mayor número de descansos para agua y descanso cada hora, supervisar a los trabajadores para asegurarse de que tomen estos descansos y observar de cerca a todos los trabajadores para detectar signos de enfermedad por calor.</p>
<p><strong>4.3</strong> – Al inicio de la jornada laboral durante una ola de calor, el Supervisor mantendrá una reunión de seguridad con los trabajadores para revisar los procedimientos de prevención de enfermedades por calor, el pronóstico del clima y el plan de respuesta a emergencias.</p>
<p><strong>4.4</strong> – El Supervisor asignará a cada empleado un "compañero" (buddy) para estar atento a los signos de enfermedad por calor y garantizar que se inicien los procedimientos de emergencia si alguien muestra síntomas.</p>
<p><strong>4.4.1</strong> – Los empleados nuevos durante sus primeras dos semanas serán monitoreados de cerca para observar su aclimatación. El supervisor o un empleado designado los monitoreará e intentará disminuir la intensidad del trabajo durante una ola de calor.</p>

<h3>Procedimientos para Calor Extremo (Activados a 95°F o más)</h3>
<p><strong>4.5</strong> – Cuando la temperatura sea igual o supere los 95°F, el Supervisor será extra vigilante al observar y monitorear a los empleados a través de uno de los siguientes medios:</p>
<ul>
    <li>El supervisor o un empleado designado por él observará a 20 o menos empleados.</li>
    <li>Se implementará un sistema de compañeros obligatorio.</li>
    <li>Para los empleados que trabajen solos, el supervisor verificará su estado cada hora por radio o teléfono celular.</li>
    <li>Los dispositivos electrónicos (teléfono celular, radio) se pueden usar solo si la recepción en el área es confiable.</li>
</ul>
<p><strong>4.6</strong> – Los procedimientos para calor extremo incluirán designar a uno o más empleados en cada sitio de trabajo como autorizados para llamar a los servicios médicos de emergencia y permitir que otros empleados llamen cuando no haya ningún empleado designado disponible.</p>
<p><strong>4.7</strong> – El Supervisor recordará a los empleados a lo largo del turno de trabajo que beban abundante agua.</p>
<p><strong>4.8</strong> – El Supervisor llevará a cabo una reunión previa al turno antes del inicio del trabajo para revisar los procedimientos de calor extremo, alentar la hidratación y recordar a los empleados su derecho a tomar descansos de enfriamiento. Para los empleados remotos, esto se puede realizar a través de teléfono celular o radio.</p>
<p><strong>4.9</strong> – Cuando las temperaturas alcancen los 95°F o más, se requiere que los empleados tomen un período de descanso de enfriamiento preventivo neto mínimo de 10 minutos cada dos horas. Esto es obligatorio. Se requieren períodos de descanso adicionales al finalizar la octava y décima hora si la jornada laboral se extiende tanto. Estos períodos de descanso deben documentarse.</p>

<div style="border: 2px dashed #cbd5e1; background: #f8fafc; padding: 20px; margin-top: 20px; border-radius: 8px;">
    <h3 style="margin-top: 0; text-align: center;">Documento 4-A - Registro de Descanso Obligatorio</h3>
    <p style="font-size: 0.9rem; color: #64748b; text-align: center;">Cuando las temperaturas alcancen los 95 grados o más, los empleados deben tomar un descanso de enfriamiento preventivo neto mínimo de 10 minutos cada dos horas. Registre los horarios a continuación:</p>
    <table style="width:100%; border-collapse:collapse; background:white; margin-top:10px;" border="1" cellpadding="6">
        <thead>
            <tr style="background:#f1f5f9;">
                <th style="width:10%;">No.</th>
                <th style="width:50%;">Empleado Name / Nombre en Letra de Molde</th>
                <th style="width:40%;">Time Rest Period Taken / Hora del Descanso</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>1</td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td></tr>
        </tbody>
    </table>
    <p style="font-size: 0.8rem; color: #64748b; margin-top: 10px;">* Fotocopie según sea necesario para cuadrillas más grandes. Consérvese en archivo para inspección.</p>
</div>`
            },
            {
                id: "hipp_acclimatization",
                title: "Procedures for Acclimatization / Aclimatación",
                content_template: `<h2>Section 5 - Procedures for Acclimatization</h2>
<p><strong>5.1</strong> – Acclimatization is a process by which the body adjusts to increased heat exposure. Acclimatization is fully achieved in most persons within 4 to 14 days of regular work involving at least 2 hours per day in the heat.</p>
<p><strong>5.2</strong> – Inadequate acclimatization can be significantly more perilous in conditions of high heat and physical stress. {{client_name}} is responsible for the working conditions of their employees, and they must act effectively when conditions result in sudden exposure to heat their employees are not used to.</p>
<p><strong>5.3</strong> – {{client_name}} will monitor the weather daily and the supervisor in particular will be on the lookout for sudden heat wave(s) or increases in temperatures to which employees haven't been exposed for several weeks or longer.</p>
<p><strong>5.4</strong> – During a heat wave or heat spike, we may cut short the workday (example: end at 12 PM), reschedule certain jobs (example: conducted at night or during cooler hours), or if possible, cease work for the day.</p>
<p><strong>5.5</strong> – During the hot summer months, the work shift will start earlier in the day or later in the evening.</p>
<p><strong>5.6</strong> – For new employees and any employees who have been newly assigned to a high heat area, the Supervisor will try to find ways to lessen the intensity of the employees' work during the first 14 days (such as scheduling slower-paced, less physically demanding work during the hot parts of the day and the heaviest work activities during the cooler parts of the day). Steps taken to lessen the intensity of the workload for new employees will be documented.</p>
<p><strong>5.7</strong> – The Supervisor, or someone designated by him, will be extra-vigilant with new employees and stay alert to the presence of heat-related symptoms. New employees shall be closely observed for the first 14 days of their employment.</p>
<p><strong>5.8</strong> – The Supervisor will assign new employees a "buddy" or experienced coworker to watch each other closely for discomfort or symptoms of heat illness.</p>
<p><strong>5.9</strong> – During a heat wave, the Supervisor will observe all employees closely (or maintain frequent communication via phone or radio) and look out for possible symptoms of heat illness.</p>
<p><strong>5.10</strong> – {{client_name}}'s training for employees and supervisors will include the importance of acclimatization, how it is developed, and how these company procedures address it. We will NOT allow employees who are not accustomed to working in extreme weather and workload conditions to participate in those jobs or work activities that expose them to these extreme conditions. This is particularly true of younger and older employees.</p>`,
                content_template_es: `<h2>Sección 5 - Procedimientos para la Aclimatación</h2>
<p><strong>5.1</strong> – La aclimatación es un proceso mediante el cual el cuerpo se adapta a una mayor exposición al calor. La aclimatación se logra por completo en la mayoría de las personas dentro de 4 a 14 días de trabajo regular que implique al menos 2 horas por día en el calor.</p>
<p><strong>5.2</strong> – La aclimatación inadecuada puede ser significativamente más peligrosa en condiciones de calor extremo y estrés físico. {{client_name}} es responsable de las condiciones de trabajo de sus empleados y debe actuar de manera efectiva cuando las condiciones resulten en una exposición repentina al calor al que sus empleados no están acostumbrados.</p>
<p><strong>5.3</strong> – {{client_name}} monitoreará el clima diariamente y el supervisor en particular estará atento a olas de calor repentinas o aumentos de temperatura a los que los empleados no hayan estado expuestos durante varias semanas o más.</p>
<p><strong>5.4</strong> – Durante una ola de calor o un pico de calor, podemos acortar la jornada laboral (por ejemplo, terminar a las 12 PM), reprogramar ciertos trabajos (por ejemplo, realizarlos de noche o durante las horas más frescas) o, si es posible, suspender el trabajo por el día.</p>
<p><strong>5.5</strong> – Durante los meses calurosos de verano, el turno de trabajo comenzará más temprano en el día o más tarde en la tarde.</p>
<p><strong>5.6</strong> – Para los empleados nuevos y cualquier empleado que haya sido asignado recientemente a un área de calor extremo, el Supervisor intentará encontrar formas de disminuir la intensidad del trabajo de los empleados durante los primeros 14 días (como programar un ritmo de trabajo más lento y menos exigente físicamente durante las partes calurosas del día y las actividades de trabajo más pesadas durante las partes más frescas del día). Se documentarán los pasos tomados para disminuir la intensidad de la carga de trabajo de los empleados nuevos.</p>
<p><strong>5.7</strong> – El Supervisor, o alguien designado por él, será extra vigilante con los empleados nuevos y se mantendrá alerta a la presencia de síntomas relacionados con el calor. Los empleados nuevos serán observados de cerca durante los primeros 14 días de su empleo.</p>
<p><strong>5.8</strong> – El Supervisor asignará a los empleados nuevos un "compañero" (buddy) o un compañero de trabajo experimentado para vigilarse de cerca mutuamente en busca de malestar o síntomas de enfermedad por calor.</p>
<p><strong>5.9</strong> – Durante una ola de calor, el Supervisor observará de cerca a todos los empleados (o mantendrá comunicación frecuente por teléfono o radio) y estará atento a posibles síntomas de enfermedad por calor.</p>
<p><strong>5.10</strong> – La capacitación de {{client_name}} para empleados y supervisores incluirá la importancia de la aclimatación, cómo se desarrolla y cómo la abordan estos procedimientos de la empresa. NO permitiremos que los empleados que no estén acostumbrados a trabajar en condiciones climáticas y de carga de trabajo extremas participen en aquellos trabajos o actividades laborales que los expongan a estas condiciones extremas. Esto es particularmente cierto para los empleados más jóvenes y los de más edad.</p>`
            },
            {
                id: "hipp_emergency",
                title: "Emergency Response Procedures / Respuesta de Emergencia",
                content_template: `<h2>Section 6 - Emergency Response Procedures</h2>
<p><strong>6.1</strong> – Prior to assigning a crew to a particular worksite, the {{client_name}} Management will provide workers and the Supervisor with clear and precise directions (such as streets or road names, distinguishing features, and distances to major roads) of the site to avoid a delay in emergency medical services.</p>
<p><strong>6.1.1</strong> – When contacting EMS, the Supervisor will remain on the phone with EMS until EMS has clear and precise instructions to the worksite. Clear directions to the worksite: <strong>{{emergency_directions_to_site}}</strong> must be provided to emergency services.</p>
<p><strong>6.1.2</strong> – The Supervisor will provide the name of the Location, physical address of the location, and the phone number of the location (e.g. {{client_address}}).</p>
<p><strong>6.1.3</strong> – If in an isolated area or an area where there is no physical address available, the Supervisor will provide instructions which will include the use of directions such as North, South, East, West, and landmarks.</p>
<p><strong>6.2</strong> – Prior to assigning a crew to a particular worksite, the {{client_name}} management will ensure that a qualified, appropriately trained and equipped person will be available at the site to render first aid if necessary.</p>
<p><strong>6.3</strong> – Prior to the start of the shift, the Supervisor will determine if a language barrier is present at the site and take steps (such as assigning the responsibility to call emergency medical services to an English-speaking worker or handling it himself) to ensure that emergency medical services can be immediately called in an emergency.</p>
<p><strong>6.4</strong> – All foremen and supervisors will carry cell phones or other means of communication, and check that these are functional at the worksite prior to each shift.</p>
<p><strong>6.5</strong> – When an employee is showing symptoms of possible heat illness, the Supervisor will take immediate steps to keep the stricken employee cool and comfortable once emergency service responders have been called. The affected employee will never be left unattended.</p>
<p><strong>6.6</strong> – At remote locations such as rural farms, lots, or undeveloped areas, the Supervisor will designate an employee or employees to physically go to the nearest road or highway where emergency responders can see them. If daylight is diminished, the designated employee(s) shall be given reflective vests or flashlights in order to direct emergency personnel.</p>
<p><strong>6.7</strong> – During a heat wave or hot temperatures, workers will be reminded and encouraged to immediately report to their supervisor any signs or symptoms they are experiencing.</p>
<p><strong>6.8</strong> – {{client_name}}'s training for employees and supervisors will include every detail of these written emergency procedures.</p>

<h3>Handling a Sick Employee</h3>
<p><strong>6.9</strong> – When an employee displays possible signs or symptoms of heat illness, a trained first aid worker or supervisor will check the sick employee and determine whether resting in the shade and drinking cool water will suffice or if emergency service providers need to be called. Do not leave a sick worker alone in the shade, as he or she can take a turn for the worse!</p>
<p><strong>6.10</strong> – When an employee displays possible signs or symptoms of heat illness and no trained first aid worker or supervisor is available at the site, call emergency service providers (911).</p>
<p><strong>6.11</strong> – Call emergency service providers immediately if an employee displays severe signs of heat illness (e.g. decreased level of consciousness, staggering, vomiting, disorientation, irrational behavior, incoherent speech, convulsions, red and hot face), does not look OK, or does not improve after drinking water and resting in the shade. While the ambulance is en route, initiate first aid:</p>
<ol>
    <li>Cool the worker by placing him/her in the shade.</li>
    <li>Remove excess layers of clothing and provide small sips of water if the victim is conscious.</li>
    <li>Place ice packs or cloths soaked in cold water in the armpits and over the body. Fan the victim to bring down core body temperature.</li>
    <li>Place the person in a comfortable position, elevating feet about 12" (30cm). If the victim vomits, roll them onto their side to prevent choking.</li>
    <li>Do not let a sick worker leave the site, as they can get lost or pass away before reaching a hospital.</li>
</ol>
<p><strong>6.12</strong> – If an employee does not look OK, displays signs of severe heat illness, and the worksite is located more than 20 minutes away from a hospital, call emergency service providers, communicate the signs and symptoms, and request an Air Ambulance.</p>`,
                content_template_es: `<h2>Sección 6 - Procedimientos de Respuesta de Emergencia</h2>
<p><strong>6.1</strong> – Antes de asignar una cuadrilla a un sitio de trabajo en particular, la administración de {{client_name}} proporcionará a los trabajadores y al Supervisor un mapa junto con instrucciones claras y precisas (como nombres de calles o caminos, características distintivas y distancias a las carreteras principales) del sitio, para evitar retrasos en los servicios médicos de emergencia.</p>
<p><strong>6.1.1</strong> – Al comunicarse con los servicios de emergencia (EMS), el Supervisor permanecerá en el teléfono con EMS hasta que tengan instrucciones claras y precisas para llegar al sitio de trabajo. Se deben proporcionar instrucciones claras al sitio de trabajo: <strong>{{emergency_directions_to_site}}</strong> a los servicios de emergencia.</p>
<p><strong>6.1.2</strong> – El Supervisor proporcionará el nombre de la ubicación, la dirección física de la ubicación y el número de teléfono de la ubicación (por ejemplo, {{client_address}}).</p>
<p><strong>6.1.3</strong> – Si se encuentra en un área aislada, o en un área donde no hay una dirección física disponible, el Supervisor proporcionará instrucciones que incluirán el uso de direcciones como Norte, Sur, Este, Oeste y puntos de referencia.</p>
<p><strong>6.2</strong> – Antes de asignar una cuadrilla a un sitio de trabajo en particular, la administración de {{client_name}} se asegurará de que una persona calificada, adecuadamente capacitada y equipada esté disponible en el sitio para brindar primeros auxilios si es necesario.</p>
<p><strong>6.3</strong> – Antes del inicio del turno, el Supervisor determinará si hay una barrera del idioma en el sitio y tomará medidas (como asignar la responsabilidad de llamar a los servicios de emergencia a un trabajador que hable inglés o el Supervisor se encargará de esto él mismo) para garantizar que los servicios médicos de emergencia puedan ser llamados inmediatamente en caso de una emergencia.</p>
<p><strong>6.4</strong> – Todos los capataces y supervisores llevarán teléfonos celulares u otros medios de comunicación, y verificarán que estos funcionen en el lugar de trabajo antes de cada turno.</p>
<p><strong>6.5</strong> – Cuando un empleado muestre síntomas de posible enfermedad por calor, el Supervisor tomará medidas inmediatas para mantener al empleado afectado fresco y cómodo una vez que se haya llamado a los respondedores de servicios de emergencia. El empleado afectado nunca se dejará desatendido.</p>
<p><strong>6.6</strong> – En ubicaciones remotas como granjas rurales, lotes o áreas no desarrolladas, el Supervisor designará a un empleado o empleados para que vayan físicamente a la carretera o autopista más cercana donde los socorristas puedan verlos. Si la luz del día es escasa, los empleados designados recibirán chalecos reflectantes o linternas para dirigir al personal de emergencia.</p>
<p><strong>6.7</strong> – Durante una ola de calor o temperaturas calurosas, se recordará y alentará a los trabajadores a informar de inmediato a su supervisor sobre cualquier signo o síntoma que estén experimentando.</p>
<p><strong>6.8</strong> – La capacitación de {{client_name}} para empleados y supervisores incluirá cada detalle de estos procedimientos de emergencia escritos.</p>

<h3>Manejo de un Empleado Enfermo</h3>
<p><strong>6.9</strong> – Cuando un empleado muestra posibles signos o síntomas de enfermedad por calor, un trabajador capacitado en primeros auxilios o el supervisor revisará al empleado enfermo y determinará si descansar a la sombra y beber agua fresca será suficiente o si será necesario llamar a los proveedores de servicios de emergencia. ¡No deje a un trabajador enfermo solo en la sombra, ya que su estado puede empeorar!</p>
<p><strong>6.10</strong> – Cuando un empleado muestra posibles signos o síntomas de enfermedad por calor y no hay ningún supervisor o trabajador capacitado en primeros auxilios disponible en el sitio, llame a los proveedores de servicios de emergencia (911).</p>
<p><strong>6.11</strong> – Llame a los proveedores de servicios de emergencia de inmediato si un empleado muestra signos severos de enfermedad por calor (por ejemplo: disminución del nivel de conciencia, tambaleo, vómitos, desorientación, comportamiento irracional, habla incoherente, convulsiones, rostro rojo y caliente), no se ve bien o no mejora después de beber agua y descansar en la sombra. Mientras la ambulancia está en camino, inicie los primeros auxilios:</p>
<ol>
    <li>Enfríe al trabajador colocándolo a la sombra.</li>
    <li>Retire las capas de ropa sobrantes y proporcione pequeños sorbos de agua si la víctima está consciente.</li>
    <li>Coloque compresas de hielo o paños empapados en agua fría en las axilas y sobre el cuerpo. Abanique a la víctima para bajar la temperatura corporal central.</li>
    <li>Coloque a la persona en una posición cómoda, elevando los pies unas 12 pulgadas (30 cm). Si la víctima vomita, gírela de lado para evitar que se asfixie.</li>
    <li>No permita que un trabajador enfermo abandone el sitio, ya que puede perderse o fallecer antes de llegar a un hospital.</li>
</ol>
<p><strong>6.12</strong> – Si un empleado no se ve bien, muestra signos de enfermedad grave por calor y el sitio de trabajo está ubicado a más de 20 minutos de un hospital, llame a los proveedores de servicios de emergencia, comunique los signos y síntomas y solicite una Ambulancia Aérea.</p>`
            },
            {
                id: "hipp_training",
                title: "Employee & Supervisory Training / Capacitación de Empleados",
                content_template: `<h2>Section 7 - Procedures for Employee and Supervisory Training</h2>
<p><strong>7.1</strong> – {{client_name}} will ensure that all supervisors are trained prior to being assigned to supervise other workers. Training will include {{client_name}}'s written procedures and the steps supervisors will follow when employees exhibit symptoms consistent with heat illness. The following will be a part of the supervisor and employee training:</p>
<ul>
    <li>The environmental and personal risk factors for heat illness, as well as the added burden of heat load on the body caused by exertion, clothing, and personal protective equipment.</li>
    <li>{{client_name}}'s procedures for complying with the requirements of this standard, including the responsibility to provide water, shade, cool-down rests, and access to first aid as well as the employees' right to exercise their rights without retaliation.</li>
    <li>The importance of frequent consumption of small quantities of water, up to 4 cups per hour, when the work environment is hot.</li>
    <li>The concept, importance, and methods of acclimatization pursuant to the employer's procedures.</li>
    <li>The different types of heat illness, common signs and symptoms, and appropriate first aid and/or emergency responses.</li>
    <li>The importance of immediately reporting signs or symptoms of heat illness in themselves or co-workers.</li>
    <li>Company procedures for responding to symptoms, including how emergency medical services will be provided and how employees will be transported or directed.</li>
</ul>
<p><strong>7.2</strong> – Supervisors will be trained on their responsibility to provide water, shade, cool-down rests, and access to first aid as well as the employees’ right to exercise their rights under this standard without retaliation.</p>
<p><strong>7.3</strong> – Supervisors will be trained in appropriate first aid and/or emergency responses to different types of heat illness, and that heat illness may progress quickly from mild to life-threatening.</p>
<p><strong>7.4</strong> – Supervisors will be trained on how to track the weather at the job site and use weather information to modify schedules or increase breaks.</p>
<p><strong>7.5</strong> – {{client_name}} will ensure that all employees and supervisors are trained prior to working outside, covering water, shade, high heat procedures, emergency response, and acclimatization.</p>
<p><strong>7.6</strong> – Employees will be trained on calling emergency medical services, handling language barriers, providing directions, and meeting emergency responders at the nearest road.</p>
<p><strong>7.7</strong> – When the temperature exceeds 80°F, the Supervisor will hold short 'tailgate' meetings to review the weather report, reinforce heat illness prevention, and provide reminders to hydrate.</p>
<p><strong>7.8</strong> – The Supervisor will assign new employees a "buddy" or experienced coworker to ensure they understand training and follow procedures.</p>`,
                content_template_es: `<h2>Sección 7 - Procedimientos para la Capacitación de Empleados y Supervisores</h2>
<p><strong>7.1</strong> – {{client_name}} se asegurará de que todos los supervisores estén capacitados antes de ser asignados a supervisar a otros trabajadores. La capacitación incluirá los procedimientos escritos de {{client_name}} y los pasos que seguirán los supervisores cuando los empleados presenten síntomas consistentes con la enfermedad por calor. Lo siguiente formará parte de la capacitación de supervisores y empleados:</p>
<ul>
    <li>Los factores de riesgo ambientales y personales para la enfermedad por calor, así como la carga adicional de calor en el cuerpo causada por el esfuerzo, la ropa y el equipo de protección personal.</li>
    <li>Los procedimientos de {{client_name}} para cumplir con los requisitos de esta norma, incluyendo la responsabilidad del empleador de proporcionar agua, sombra, descansos de enfriamiento y acceso a primeros auxilios, así como el derecho de los empleados a ejercer sus derechos sin represalias.</li>
    <li>La importancia del consumo frecuente de pequeñas cantidades de agua, hasta 4 tazas por hora, cuando el ambiente de trabajo es cálido.</li>
    <li>El concepto, importancia y métodos de aclimatación de conformidad con los procedimientos del empleador.</li>
    <li>Los diferentes tipos de enfermedad por calor, los signos y síntomas comunes, y los primeros auxilios y/o respuestas de emergencia adecuados.</li>
    <li>La importancia de informar de inmediato los signos o síntomas de enfermedad por calor en sí mismos o en sus compañeros de trabajo.</li>
    <li>Los procedimientos de la empresa para responder a los síntomas, incluyendo cómo se proporcionarán los servicios médicos de emergencia y cómo se transportará o guiará a los empleados.</li>
</ul>
<p><strong>7.2</strong> – Los supervisores serán capacitados sobre su responsabilidad de proporcionar agua, sombra, descansos de enfriamiento y acceso a primeros auxilios, así como sobre el derecho de los empleados a ejercer sus derechos bajo esta norma sin represalias.</p>
<p><strong>7.3</strong> – Los supervisores serán capacitados en primeros auxilios adecuados y/o respuestas de emergencia ante diferentes tipos de enfermedad por calor, y en el hecho de que la enfermedad por calor puede progresar rápidamente de leve a potencialmente mortal.</p>
<p><strong>7.4</strong> – Los supervisores serán capacitados sobre cómo realizar un seguimiento del clima en el lugar de trabajo y utilizar la información meteorológica para modificar los horarios o aumentar los descansos.</p>
<p><strong>7.5</strong> – {{client_name}} se asegurará de que todos los empleados y supervisores reciban capacitación antes de trabajar al aire libre, cubriendo agua, sombra, procedimientos de calor extremo, respuesta de emergencia y aclimatación.</p>
<p><strong>7.6</strong> – Los empleados serán capacitados sobre los pasos que se seguirán para comunicarse con los servicios médicos de emergencia, el manejo de las barreras del idioma, la provisión de instrucciones y la reunión con los servicios de emergencia en la carretera más cercana.</p>
<p><strong>7.7</strong> – Cuando la temperatura supere los 80°F, el Supervisor llevará a cabo breves reuniones de seguridad para revisar el reporte del clima, reforzar la prevención de enfermedades por calor y recordar que beban agua con frecuencia.</p>
<p><strong>7.8</strong> – El Supervisor asignará a los empleados nuevos un "compañero" (buddy) o un compañero de trabajo experimentado para garantizar que comprendan la capacitación y sigan los procedimientos.</p>`
            },
            {
                id: "hipp_indoor",
                title: "Indoor Operations (8 CCR §3396) / Operaciones en Interiores",
                content_template: `<h2>Section 8 - Indoor Operations</h2>
<p><strong>8.1</strong> – Pursuant to Title 8, California Code of Regulations, Section 3396 (Indoor Heat Illness Prevention), {{client_name}} has evaluated indoor work areas located in {{indoor_evaluation_county}}, a region recognized for experiencing prolonged and extreme summer temperatures. During the summer season, ambient outdoor conditions routinely result in elevated indoor temperatures in non–temperature-controlled workspaces, including but not limited to warehouses, maintenance shops, and similar industrial or operational facilities.</p>
<p>{{client_name}} has assessed feasible engineering and administrative controls as required under 8 CCR §3396(e) and has determined that, due to structural limitations, operational demands, and the substantial financial and logistical burden associated with installing permanent mechanical cooling systems, it is not feasible or practicable to consistently reduce indoor temperatures below the applicable temperature thresholds identified in 8 CCR §3396(b) (82°F [when wearing clothing that restricts heat removal] or 87°F) within these non–temperature-controlled areas.</p>
<p><strong>8.2</strong> – Designation of Summer Months: For the purposes of this Indoor Heat Illness Prevention Plan, {{client_name}} formally designates the period of April 1 through September 30 of each calendar year as the Summer Heat Season. During this period, indoor temperatures in affected work areas are reasonably anticipated to exceed the threshold temperatures identified in 8 CCR §3396(b) on a regular and sustained basis.</p>
<p><strong>8.3</strong> – Application of Continuous Emergency Procedures: In recognition of these predictable and sustained extreme heat conditions, and in accordance with 8 CCR §3396(f) (Heat Illness Emergency Response), {{client_name}} has determined that it is necessary and appropriate to apply heat illness emergency procedures continuously during the designated Summer Heat Season for employees working in affected indoor areas. Accordingly, during this period, {{client_name}} will operate under emergency-level protective measures at all times, including but not limited to:</p>
<ul>
    <li>Continuous access to potable drinking water in compliance with 8 CCR §3396(c)</li>
    <li>Mandatory cool-down rest breaks and access to cooler areas</li>
    <li>Active observation and monitoring of employees for signs and symptoms of heat illness</li>
    <li>Immediate response procedures, including first aid and emergency medical services, when heat illness is suspected</li>
    <li>Supervisor authority to modify work practices, reduce workloads, or stop work when necessary to protect employee health</li>
    <li>Ongoing employee and supervisory training as required under 8 CCR §3396(i)</li>
</ul>
<p><strong>8.4</strong> – This proactive application of emergency procedures ensures that employees receive the highest level of protection under conditions where threshold temperatures are consistently exceeded and where temperature reduction below regulatory limits is not reasonably achievable.</p>
<p><strong>8.5</strong> – This policy represents {{client_name}}’s good-faith compliance with 8 CCR §3396, taking into account the environmental realities of {{indoor_evaluation_county}} while prioritizing employee safety through continuous emergency-level heat illness prevention and response measures.</p>
<p><strong>8.6</strong> – Procedures for Office Staff in the event of HVAC Failure: In the event of a failure of mechanical Engineering Controls (HVAC system), {{client_name}} will immediately conduct an indoor temperature and heat index assessment in accordance with 8 CCR §3396. If temperatures reach or exceed the trigger threshold of 87°F and alternative engineering controls are not feasible to maintain a safe working environment, the employer will implement Administrative Controls. These controls shall include the immediate cessation of work activities and the relocation or dismissal of affected employees from the area to prevent the risk of heat-related illness.</p>`,
                content_template_es: `<h2>Sección 8 - Operaciones en Interiores</h2>
<p><strong>8.1</strong> – De conformidad con el Título 8 del Código de Regulaciones de California, Sección 3396 (Prevención de Enfermedades por Calor en Interiores), {{client_name}} ha evaluado las áreas de trabajo en interiores ubicadas en el {{indoor_evaluation_county}}, una región reconocida por experimentar temperaturas de verano prolongadas y extremas. Durante la temporada de verano, las condiciones ambientales al aire libre resultan rutinariamente en temperaturas elevadas en los espacios de trabajo interiores que no están controlados por temperatura, incluidos, entre otros, almacenes, talleres de mantenimiento y plantas industriales u operativas similares.</p>
<p>{{client_name}} ha evaluado los controles administrativos y de ingeniería factibles según lo requerido por la norma 8 CCR §3396(e) y ha determinado que, debido a limitaciones estructurales, demandas operativas y la carga financiera y logística sustancial asociada con la instalación de sistemas de enfriamiento mecánico permanente, no es factible o practicable reducir consistentemente las temperaturas interiores por debajo de los umbrales de temperatura aplicables identificados en la norma 8 CCR §3396(b) (82°F [cuando se usa ropa que restringe la eliminación del calor] o 87°F) dentro de estas áreas no controladas por temperatura.</p>
<p><strong>8.2</strong> – Designación de los Meses de Verano: Para los propósitos de este Plan de Prevención de Enfermedades por Calor en Interiores, {{client_name}} designa formalmente el período del 1 de abril al 30 de septiembre de cada año calendario como la Temporada de Calor de Verano. Durante este período, se prevé razonablemente que las temperaturas interiores en las áreas de trabajo afectadas superen de manera regular y sostenida las temperaturas umbral identificadas en la norma 8 CCR §3396(b).</p>
<p><strong>8.3</strong> – Aplicación de Procedimientos de Emergencia Continuos: En reconocimiento a estas condiciones de calor extremo predecibles y sostenidas, y de acuerdo con la norma 8 CCR §3396(f) (Respuesta de Emergencia para Enfermedades por Calor), {{client_name}} ha determinado que es necesario y apropiado aplicar los procedimientos de emergencia por enfermedades por calor de manera continua durante la Temporada de Calor de Verano designada para los empleados que trabajan en las áreas interiores afectadas. En consecuencia, durante este período, {{client_name}} operará bajo medidas de protección a nivel de emergencia en todo momento, que incluyen, entre otras, las siguientes:</p>
<ul>
    <li>Acceso continuo a agua potable de conformidad con la norma 8 CCR §3396(c)</li>
    <li>Descansos obligatorios de enfriamiento y acceso a áreas más frescas</li>
    <li>Observación activa y monitoreo de los empleados en busca de signos y síntomas de enfermedades por calor</li>
    <li>Procedimientos de respuesta inmediata, incluidos primeros auxilios y servicios médicos de urgencia, cuando se sospeche una enfermedad por calor</li>
    <li>Autoridad del supervisor para modificar las prácticas de trabajo, reducir las cargas de trabajo o detener el trabajo cuando sea necesario para proteger la salud de los empleados</li>
    <li>Capacitación continua para empleados y supervisores según lo requerido por la norma 8 CCR §3396(i)</li>
</ul>
<p><strong>8.4</strong> – Esta aplicación proactiva de procedimientos de emergencia garantiza que los empleados reciban el más alto nivel de protección en condiciones donde las temperaturas umbral se superan constantemente y donde la reducción de la temperatura por debajo de los límites regulatorios no es razonablemente alcanzable.</p>
<p><strong>8.5</strong> – Esta política representa el cumplimiento de buena fe de {{client_name}} con la norma 8 CCR §3396, teniendo en cuenta las realidades ambientales del {{indoor_evaluation_county}} mientras se prioriza la seguridad de los empleados a través de medidas continuas de prevención y respuesta a enfermedades por calor a nivel de emergencia.</p>
<p><strong>8.6</strong> – Procedimientos para el Personal de Oficina en Caso de Falla de HVAC: En caso de una falla en los controles mecánicos de ingeniería (sistema HVAC), {{client_name}} llevará a cabo de inmediato una evaluación de la temperatura interior y del índice de calor de acuerdo con la norma 8 CCR §3396. Si las temperaturas alcanzan o superan el umbral de activación de 87°F y los controles de ingeniería alternativos no son factibles para mantener un entorno de trabajo seguro, el empleador implementará controles administrativos. Estos controles incluirán el cese inmediato de las actividades laborales y la reubicación o despido de los empleados afectados del área para evitar el riesgo de enfermedades relacionadas con el calor.</p>`
            }
        ]
    },
        {
        id: "wvpp",
        name: "Workplace Violence Prevention Plan (WVPP)",
        abbreviation: "WVPP",
        content_template: `<h1>Workplace Violence Prevention Plan (WVPP)</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Plan Initiation Date:</strong> {{wvpp_initiation_date}}</p>
<p><strong>Date of Last Review:</strong> {{wvpp_last_review_date}}</p>
<p><strong>Program Administrator:</strong> {{wvpp_administrator_name}} ({{wvpp_administrator_title}})</p>
<p><strong>Administrator Contact:</strong> Phone: {{wvpp_administrator_phone}} | Email: {{wvpp_administrator_email}}</p>
<p><strong>Program Assistant:</strong> {{wvpp_assistant_name}} ({{wvpp_assistant_title}})</p>
<p><strong>Assistant Contact:</strong> Phone: {{wvpp_assistant_phone}} | Email: {{wvpp_assistant_email}}</p>
<p>This Workplace Violence Prevention Program (WVPP) aids {{client_name}} in protecting workers from physical and mental harm at work. It adds to the Company’s existing and effective Injury and Illness Prevention Program. This plan is maintained in accordance with California Senate Bill 553 (Labor Code Section 6401.9) and applies to all operations and facilities located at {{client_address}}.</p>`,
        content_template_es: `<h1>Programa de Prevención de Violencia en el Lugar de Trabajo (WVPP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Inicio del Plan:</strong> {{wvpp_initiation_date}}</p>
<p><strong>Fecha de la Última Revisión:</strong> {{wvpp_last_review_date}}</p>
<p><strong>Administrador del Programa:</strong> {{wvpp_administrator_name}} ({{wvpp_administrator_title}})</p>
<p><strong>Contacto del Administrador:</strong> Teléfono: {{wvpp_administrator_phone}} | Correo: {{wvpp_administrator_email}}</p>
<p><strong>Asistente del Programa:</strong> {{wvpp_assistant_name}} ({{wvpp_assistant_title}})</p>
<p><strong>Contacto del Asistente:</strong> Teléfono: {{wvpp_assistant_phone}} | Correo: {{wvpp_assistant_email}}</p>
<p>Este Programa de Prevención de Violencia en el Lugar de Trabajo (WVPP) ayuda a {{client_name}} a proteger a los trabajadores de daños físicos y mentales en el trabajo. Se suma al Programa de Prevención de Lesiones y Enfermedades existente y eficaz de la Empresa. Este plan se mantiene de conformidad con el Proyecto de Ley del Senado de California 553 (Sección 6401.9 del Código de Trabajo) y se aplica a todas las operaciones e instalaciones ubicadas en {{client_address}}.</p>`,
        subsections: [
            {
                id: "wvpp_scope",
                title: "Definitions & Scope / Definiciones y Alcance",
                content_template: `<h2>1. Definitions & Scope</h2>
<p>This Workplace Violence Prevention Program (WVPP) aids {{client_name}} in protecting workers from physical and mental harm at work. It adds to the Company’s existing and effective Injury and Illness Prevention Program (IIPP). This plan is maintained in accordance with California’s Senate Bill 553.</p>
<p><strong>Workplace violence</strong> is defined as any act or threat of violence, harassment, intimidation, or other threatening, disruptive behavior that can occur on the job. It does not include lawful acts of self-defense or the defense of others.</p>
<p>The program covers the following four workplace violence types:</p>
<ul>
    <li><strong>Type 1 Violence:</strong> Workplace violence committed by a person who has no legitimate business at the worksite and includes violent acts by anyone who enters the workplace or approaches employees with the intent to commit a crime.</li>
    <li><strong>Type 2 Violence:</strong> Workplace violence directed at employees by customers, clients, patients, students, inmates, or visitors.</li>
    <li><strong>Type 3 Violence:</strong> Workplace violence against an employee by a present or former employee, supervisor, or manager.</li>
    <li><strong>Type 4 Violence:</strong> Workplace violence committed in the workplace by a person who does not work there but has or is known to have had a personal relationship with an employee.</li>
</ul>`,
                content_template_es: `<h2>1. Definiciones y Alcance</h2>
<p>Este Programa de Prevención de Violencia en el Lugar de Trabajo (WVPP) ayuda a {{client_name}} a proteger a los trabajadores de daños físicos y mentales en el trabajo. Se suma al Programa de Prevención de Lesiones y Enfermedades (IIPP) existente y eficaz de la Empresa. Este plan se mantiene de conformidad con la Ley del Senado de California 553.</p>
<p>La <strong>violencia en el lugar de trabajo</strong> se define como cualquier acto o amenaza de violencia, acoso, intimidación u otro comportamiento amenazante o perturbador que ocurra en el trabajo. No incluye actos legítimos de defensa propia o la defensa de otros.</p>
<p>El programa cubre los siguientes cuatro tipos de violencia laboral:</p>
<ul>
    <li><strong>Violencia Tipo 1:</strong> Violencia laboral cometida por una persona que no tiene un negocio legítimo en el lugar de trabajo e incluye actos violentos cometidos por cualquier persona que ingrese al lugar de trabajo o se acerque a los empleados con la intención de cometer un delito.</li>
    <li><strong>Violencia Tipo 2:</strong> Violencia laboral dirigida a los empleados por clientes, usuarios, pacientes, estudiantes, reclusos o visitantes.</li>
    <li><strong>Violencia Tipo 3:</strong> Violencia laboral contra un empleado por parte de un empleado, supervisor o gerente actual o anterior.</li>
    <li><strong>Violencia Tipo 4:</strong> Violencia laboral cometida en el lugar de trabajo por una persona que no trabaja allí pero tiene o se sabe que ha tenido una relación personal con un empleado.</li>
</ul>`
            },
            {
                id: "wvpp_plan_review",
                title: "Plan Review / Revisión del Plan",
                content_template: `<h2>2. Plan Review Protocols</h2>
<p>The Company will review this plan at least annually. Plan updates will include actively involving employees and authorized employee representatives.</p>
<p>The plan will also be updated when a deficiency is observed or becomes apparent, and after a workplace violence incident. Changes in federal, state, or local regulations that may reasonably affect workplace violence prevention will also prompt plan updates.</p>`,
                content_template_es: `<h2>2. Protocolos de Revisión del Plan</h2>
<p>La Empresa revisará este plan al menos anualmente. Las actualizaciones del plan incluirán la participación activa de los empleados y los representantes autorizados de los empleados.</p>
<p>El plan también se actualizará cuando se observe o se manifieste una deficiencia, y después de un incidente de violencia laboral. Los cambios en las regulaciones federales, estatales o locales que puedan afectar razonablemente la prevención de la violencia en el lugar de trabajo también motivarán actualizaciones del plan.</p>`
            },
            {
                id: "wvpp_responsibility",
                title: "Responsibilities & Administration / Responsabilidades y Administración",
                content_template: `<h2>3. Responsibility & Program Administration</h2>
<p>The WVPP administrator, {{wvpp_administrator_name}}, {{wvpp_administrator_title}}, has the authority and responsibility for implementing the provisions of this plan for {{client_name}}.</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;" border="1" cellpadding="8">
    <thead>
        <tr style="background-color: var(--bg-base); font-weight: bold;">
            <th style="width: 25%;">Responsible Person</th>
            <th style="width: 20%;">Job Title</th>
            <th>WVPP Responsibility(ies)</th>
            <th style="width: 15%;">Phone</th>
            <th style="width: 20%;">Email</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>{{wvpp_administrator_name}}</strong></td>
            <td>{{wvpp_administrator_title}}</td>
            <td>Approves the final plan and any major changes. Implementing, modeling, and maintaining the principles of this plan and workplace violence prevention strategies in their work areas. Ensuring that all workplace security policies and procedures are communicated and understood by all workers. Enforcing the rules fairly and uniformly. Answering related worker questions.</td>
            <td>{{wvpp_administrator_phone}}</td>
            <td>{{wvpp_administrator_email}}</td>
        </tr>
        <tr>
            <td><strong>{{wvpp_assistant_name}}</strong></td>
            <td>{{wvpp_assistant_title}}</td>
            <td>Assisting in implementing, modeling, and maintaining the principles of this plan and workplace violence prevention strategies in their work areas. Ensuring that all workplace security policies and procedures are communicated and understood by all workers. Enforcing the rules fairly and uniformly. Answering related worker questions.</td>
            <td>{{wvpp_assistant_phone}}</td>
            <td>{{wvpp_assistant_email}}</td>
        </tr>
    </tbody>
</table>`,
                content_template_es: `<h2>3. Responsabilidad y Administración del Programa</h2>
<p>El administrador del WVPP, {{wvpp_administrator_name}}, {{wvpp_administrator_title}}, tiene la autoridad y responsabilidad de implementar las disposiciones de este plan para {{client_name}}.</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;" border="1" cellpadding="8">
    <thead>
        <tr style="background-color: var(--bg-base); font-weight: bold;">
            <th style="width: 25%;">Persona Responsable</th>
            <th style="width: 20%;">Puesto</th>
            <th>Responsabilidad del WVPP</th>
            <th style="width: 15%;">Teléfono</th>
            <th style="width: 20%;">Correo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>{{wvpp_administrator_name}}</strong></td>
            <td>{{wvpp_administrator_title}}</td>
            <td>Aprueba el plan final y cualquier cambio importante. Implementar, modelar y mantener los principios de este plan y las estrategias de prevención de violencia laboral en sus áreas de trabajo. Garantizar que todas las políticas y procedimientos de seguridad laboral se comuniquen y sean entendidos por todos los trabajadores. Hacer cumplir las normas de manera justa y uniforme. Responder preguntas relacionadas de los trabajadores.</td>
            <td>{{wvpp_administrator_phone}}</td>
            <td>{{wvpp_administrator_email}}</td>
        </tr>
        <tr>
            <td><strong>{{wvpp_assistant_name}}</strong></td>
            <td>{{wvpp_assistant_title}}</td>
            <td>Ayudar a implementar, modelar y mantener los principios de este plan y las estrategias de prevención de violencia laboral en sus áreas de trabajo. Garantizar que todas las políticas y procedimientos de seguridad laboral se comuniquen y sean entendidos por todos los trabajadores. Hacer cumplir las normas de manera justa y uniforme. Responder preguntas relacionadas de los trabajadores.</td>
            <td>{{wvpp_assistant_phone}}</td>
            <td>{{wvpp_assistant_email}}</td>
        </tr>
    </tbody>
</table>`
            },
            {
                id: "wvpp_involvement",
                title: "Employee Involvement & Compliance / Involucramiento y Cumplimiento",
                content_template: `<h2>4. Employee Active Involvement & Compliance</h2>
<p>JH ensures the following policies and procedures to obtain the active involvement of employees and authorized employee representatives in developing and implementing the plan:</p>
<ul>
    <li>During monthly safety meetings Management will ask employees to provide their input and feedback on any areas of concern they may have on Workplace Violence. An employee “Suggestion Box” is available in the {{wvpp_suggestion_box_location}} and input can remain anonymous.</li>
    <li>We will ensure that all workplace violence policies and procedures within this written plan are clearly communicated and understood by all employees. Managers and supervisors will enforce the rules fairly and uniformly.</li>
    <li>All employees will follow all workplace violence prevention plan directives, policies, and procedures, and assist in maintaining a safe work environment.</li>
    <li>The plan shall be in effect at all times and in all work areas and be specific to the hazards and corrective measures for each work area and operation.</li>
</ul>`,
                content_template_es: `<h2>4. Participación Activa y Cumplimiento de los Empleados</h2>
<p>JH garantiza las siguientes políticas y procedimientos para obtener la participación activa de los empleados y los representantes autorizados de los empleados en el desarrollo e implementación del plan:</p>
<ul>
    <li>Durante las reuniones de seguridad mensuales, la Gerencia solicitará a los empleados que brinden sus opiniones y comentarios sobre cualquier área de preocupación respecto a la Violencia Laboral. Un "Buzón de Sugerencias" para empleados está disponible en {{wvpp_suggestion_box_location}} y las opiniones pueden ser anónimas.</li>
    <li>Garantizaremos que todas las políticas y procedimientos de violencia laboral dentro de este plan escrito se comuniquen claramente y sean entendidos por todos los empleados. Los gerentes y supervisores aplicarán las normas de manera justa y uniforme.</li>
    <li>Todos los empleados seguirán todas las directivas, políticas y procedimientos del plan de prevención de violencia laboral, y colaborarán para mantener un entorno de trabajo seguro.</li>
    <li>El plan estará vigente en todo momento y en todas las áreas de trabajo, y será específico para los peligros y medidas correctivas de cada área y operación.</li>
</ul>`
            },
            {
                id: "wvpp_communication",
                title: "Employee Communication / Comunicación con Empleados",
                content_template: `<h2>5. Communication and Training with Employees</h2>
<p>The Company recognizes that open, two-way communication between management and staff about workplace security issues is essential to a safe and productive workplace. Our communication methods facilitate a continuous flow of workplace security information between management and staff in a form that is readily understandable by all affected workers, and consists of one or more of the following:</p>
<ul>
    <li>New worker orientation including workplace security policies and procedures.</li>
    <li>Review of this plan.</li>
    <li>Workplace security training programs.</li>
    <li>During our regularly scheduled monthly safety meetings.</li>
    <li>Effective communication between workers and supervisors about security and violence concerns, including translation where appropriate.</li>
    <li>Posted or distributed workplace security information.</li>
    <li>A system for workers to anonymously inform management about workplace security and violence concerns (Employee Suggestion Box in the {{wvpp_suggestion_box_location}}).</li>
    <li>A system for workers to inform management about workplace security hazards or threats of violence without fear of reprisal or adverse action.</li>
    <li>Address security issues at our workplace security team meetings.</li>
</ul>`,
                content_template_es: `<h2>5. Comunicación y Capacitación con los Empleados</h2>
<p>La Empresa reconoce que la comunicación abierta y bidireccional entre la gerencia y el personal sobre temas de seguridad laboral es esencial para un lugar de trabajo seguro y productivo. Nuestros métodos de comunicación facilitan un flujo continuo de información sobre seguridad laboral entre la gerencia y el personal en una forma que es fácilmente comprensible para todos los trabajadores afectados, y consiste en uno o más de los siguientes:</p>
<ul>
    <li>Orientación para nuevos trabajadores que incluya políticas y procedimientos de seguridad laboral.</li>
    <li>Revisión de este plan.</li>
    <li>Programas de capacitación sobre seguridad en el lugar de trabajo.</li>
    <li>Durante nuestras reuniones de seguridad mensuales programadas regularmente.</li>
    <li>Comunicación efectiva entre trabajadores y supervisores sobre inquietudes de seguridad y violencia, incluyendo traducción cuando sea apropiado.</li>
    <li>Información de seguridad laboral publicada o distribuida.</li>
    <li>Un sistema para que los trabajadores informen de manera anónima a la dirección sobre inquietudes de seguridad laboral y violencia (Buzón de sugerencias en {{wvpp_suggestion_box_location}}).</li>
    <li>Un sistema para que los trabajadores informen a la dirección sobre peligros de seguridad laboral o amenazas de violencia sin temor a represalias o acciones adversas.</li>
    <li>Abordar problemas de seguridad en nuestras reuniones del equipo de seguridad laboral.</li>
</ul>`
            },
            {
                id: "wvpp_reporting",
                title: "Incident Reporting & Timely Correction / Reporte de Incidentes y Corrección Oportuna",
                content_template: `<h2>6. Workplace Violent Incident Reporting Procedure</h2>
<p>JH will implement the following effective procedures to ensure that:</p>
<ul>
    <li>All threats or acts of workplace violence are reported to an employee’s supervisor, manager, or HR, who will inform the WVPP administrator. This will be accomplished verbally or in written form.</li>
    <li>Hazards that pose a higher risk for violence in the workplace will be corrected in a timely manner, based on the severity of the hazards. The higher the risk of violence, the greater priority the Company will take in correcting the matter.</li>
    <li>A strict non-retaliation policy is in place, and any instances of retaliation are dealt with swiftly and decisively.</li>
</ul>`,
                content_template_es: `<h2>6. Procedimiento para Reportar Incidentes Violentos en el Lugar de Trabajo</h2>
<p>JH implementará los siguientes procedimientos efectivos para asegurar que:</p>
<ul>
    <li>Todas las amenazas o actos de violencia laboral se reporten al supervisor, gerente o departamento de recursos humanos del empleado, quien informará al administrador del WVPP. Esto se realizará de forma verbal o por escrito.</li>
    <li>Los peligros que plantean un mayor riesgo de violencia en el lugar de trabajo se corregirán de manera oportuna, según la gravedad de los mismos. Cuanto mayor sea el riesgo de violencia, mayor prioridad dará la Empresa a la corrección del problema.</li>
    <li>Existe una política estricta de no represalias, y cualquier caso de represalia se tratará de manera rápida y decisiva.</li>
</ul>`
            },
            {
                id: "wvpp_hazards",
                title: "Hazard Identification / Identificación de Peligros",
                content_template: `<h2>7. Workplace Violence Hazard Identification and Evaluation</h2>
<p>The following policies and procedures are established and required to be conducted by JH to ensure that workplace violence hazards are identified and evaluated:</p>
<ol>
    <li>When Company initially adopted this Workplace Violence Prevention Program.</li>
    <li>When new workplace security hazards are introduced into the workplace.</li>
    <li>When new, previously unidentified workplace security hazards are recognized.</li>
    <li>When workplace security incidents occur.</li>
    <li>When Company hires and/or reassigns permanent or intermittent workers to processes, operations, or tasks for which a workplace security evaluation has not yet been conducted.</li>
    <li>Whenever workplace security conditions warrant an inspection.</li>
</ol>`,
                content_template_es: `<h2>7. Identificación y Evaluación de Peligros de Violencia Laboral</h2>
<p>Se establecen y requieren los siguientes procedimientos por parte de JH para garantizar que los peligros de violencia en el lugar de trabajo se identifiquen y evalúen:</p>
<ol>
    <li>Cuando la Empresa adoptó inicialmente este Programa de Prevención de Violencia en el Lugar de Trabajo.</li>
    <li>Cuando se introducen nuevos peligros de seguridad en el lugar de trabajo.</li>
    <li>Cuando se reconocen nuevos peligros de seguridad en el lugar de trabajo previamente no identificados.</li>
    <li>Cuando ocurren incidentes de seguridad en el lugar de trabajo.</li>
    <li>Cuando la Empresa contrata y/o reasigna trabajadores permanentes o intermitentes a procesos, operaciones o tareas para las cuales aún no se ha realizado una evaluación de seguridad.</li>
    <li>Cada vez que las condiciones de seguridad laboral justifiquen una inspección.</li>
</ol>`
            },
            {
                id: "wvpp_inspections",
                title: "Periodic Inspections / Inspecciones Periódicas",
                content_template: `<h2>8. Periodic Inspections</h2>
<p>Periodic inspections of workplace violence hazards will identify unsafe conditions and work practices. This may require assessment for more than one type of workplace violence. Periodic Inspections shall be conducted {{wvpp_inspection_frequency}}.</p>`,
                content_template_es: `<h2>8. Inspecciones Periódicas</h2>
<p>Las inspecciones periódicas de los peligros de violencia laboral identificarán condiciones y prácticas de trabajo inseguras. Esto puede requerir la evaluación de más de un tipo de violencia en el lugar de trabajo. Las inspecciones periódicas se realizarán {{wvpp_inspection_frequency}}.</p>`
            },
            {
                id: "wvpp_response",
                title: "Emergency Response / Respuesta a Emergencias",
                content_template: `<h2>9. Emergency Response Procedures</h2>
<p>As warranted, the Company may work with law enforcement or other experts to assess the following aspects of workplace security and response.</p>
<p>Any individual observing violent or threatening behavior that poses an immediate danger to themselves, others, or Company property is expected to:</p>
<ul>
    <li>Contact Local Law Enforcement via 911 or other appropriate emergency contacts for that facility, particularly if the situation requires immediate medical personnel.</li>
    <li>Remain calm and contact your supervisor.</li>
    <li>Secure your personal safety first.</li>
    <li>Leave the area if your safety is at risk.</li>
    <li>Cooperate with law enforcement personnel when they respond to the situation.</li>
</ul>`,
                content_template_es: `<h2>9. Procedimientos de Respuesta ante Emergencias</h2>
<p>Según sea necesario, la Empresa puede trabajar con las fuerzas del orden u otros expertos para evaluar la seguridad y la respuesta en el lugar de trabajo.</p>
<p>Cualquier persona que observe un comportamiento violento o amenazante que represente un peligro inmediato para sí misma, para otros o para la propiedad de la Empresa debe:</p>
<ul>
    <li>Contactar a las fuerzas del orden locales a través del 9-11 u otros contactos de emergencia apropiados para esa instalación, especialmente si la situación requiere personal médico inmediato.</li>
    <li>Mantener la calma y contactar a su supervisor.</li>
    <li>Garantizar su seguridad personal primero.</li>
    <li>Abandonar el área si su seguridad está en riesgo.</li>
    <li>Cooperar con el personal de las fuerzas del orden cuando respondan a la situación.</li>
</ul>`
            },
            {
                id: "wvpp_correction",
                title: "Hazard Correction & Discipline / Corrección de Peligros y Disciplina",
                content_template: `<h2>10. Workplace Violence Hazard Correction</h2>
<p>The Company does not tolerate harassment or violence of employees, customers or clients, vendors, or suppliers. Any form of harassment or violence that violates federal, state, or local law will be treated as a disciplinary matter up to and including termination.</p>
<p>For these purposes, the term “harassment” includes slurs and any other offensive remarks, jokes, or other verbal, graphic, or physical misconduct.</p>`,
                content_template_es: `<h2>10. Corrección de Peligros de Violencia Laboral</h2>
<p>La Empresa no tolera el acoso ni la violencia hacia empleados, clientes, proveedores o contratistas. Cualquier forma de acoso o violencia que viole la ley federal, estatal o local será tratada como un asunto disciplinario, hasta e incluyendo la terminación del empleo.</p>
<p>Para estos fines, el término "acoso" incluye insultos y cualquier otro comentario ofensivo, bromas u otra conducta inapropiada verbal, gráfica o física.</p>`
            },
            {
                id: "wvpp_post_incident",
                title: "Post-Incident & Investigation / Post-Incidente e Investigación",
                content_template: `<h2>11. Procedures for Post Incident Response and Investigation</h2>
<p>The Plan Administrator will appoint at least 2 people to conduct the following activities after a workplace violence concern is reported or a non-emergency incident occurs. Safety is paramount and involving law enforcement may be necessary.</p>
<ol>
    <li>Visit the incident scene as soon as possible.</li>
    <li>Interview threatened and injured workers and witnesses.</li>
    <li>Examine the workplace for factors associated with workplace security, including any previous reports of inappropriate behavior by the perpetrator.</li>
    <li>Determine the cause of the incident.</li>
    <li>Take corrective action to prevent the incident from reoccurring.</li>
    <li>Record the findings and corrective actions taken. Notify involved employees about the results of the investigation.</li>
    <li>Produce a written incident report that includes the date, time, location, description of the type of the event and circumstances leading up to it, as well as the identity of the persons involved.</li>
</ol>
<p>Ensure that no personal identifying information is recorded or documented in the written investigation report. This includes information which would reveal identification of any person involved in a violent incident, such as the person’s name, address, electronic mail address, telephone number, social security number, or other information that, alone or in combination with other publicly available information, reveals the person’s identity.</p>`,
                content_template_es: `<h2>11. Procedimientos para la Respuesta e Investigación Post-Incidente</h2>
<p>El Administrador del Plan designará al menos a 2 personas para llevar a cabo las siguientes actividades después de que se reporte una inquietud de violencia laboral o ocurra un incidente que no sea de emergencia. La seguridad es primordial y puede ser necesario involucrar a las fuerzas del orden.</p>
<ol>
    <li>Visitar la escena del incidente tan pronto como sea posible.</li>
    <li>Entrevistar a los trabajadores amenazados y lesionados, así como a los testigos.</li>
    <li>Examinar el lugar de trabajo para detectar factores asociados con la seguridad laboral, incluyendo cualquier reporte previo de comportamiento inapropiado por parte del agresor.</li>
    <li>Determinar la causa del incidente.</li>
    <li>Tomar medidas correctivas para evitar que el incidente vuelva a ocurrir.</li>
    <li>Registrar los hallazgos y las medidas correctivas tomadas. Notificar a los empleados involucrados sobre los resultados de la investigación.</li>
    <li>Producir un reporte de incidente escrito que incluya la fecha, hora, ubicación, descripción del tipo de evento y circunstancias que llevaron a él, así como la identidad de las personas involucradas.</li>
</ol>
<p>Asegúrese de que no se registre ni se documente ninguna información de identificación personal en el reporte escrito de la investigación. Esto incluye información que revelaría la identidad de cualquier persona involucrada en un incidente violento, como el nombre, dirección, correo electrónico, número de teléfono, número de seguro social u otra información de identificación.</p>`
            },
            {
                id: "wvpp_training",
                title: "Training Requirements / Requisitos de Capacitación",
                content_template: `<h2>12. Training and Instruction</h2>
<p>All employees, including managers and supervisors, will have training and instruction on general and job-specific workplace violence practices. These sessions could involve presentations, discussions, and practical exercises. Training and instruction will be provided as follows:</p>
<ul>
    <li>When the WVPP was first established.</li>
    <li>Annually to ensure all employees understand and comply with the plan.</li>
    <li>Whenever a new or previously unrecognized workplace violence hazard has been identified and when changes are made to the plan. The additional training may be limited to addressing the new workplace violence hazard or changes to the plan.</li>
</ul>`,
                content_template_es: `<h2>12. Capacitación e Instrucción</h2>
<p>Todos los empleados, incluyendo gerentes y supervisores, recibirán capacitación e instrucción sobre prácticas generales y específicas de violencia laboral. Estas sesiones pueden incluir presentaciones, discusiones y ejercicios prácticos. La capacitación e instrucción se proporcionarán de la siguiente manera:</p>
<ul>
    <li>Cuando el WVPP se estableció por primera vez.</li>
    <li>Anualmente para garantizar que todos los empleados entiendan y cumplan con el plan.</li>
    <li>Cada vez que se identifique un peligro de violencia laboral nuevo o previamente no reconocido y cuando se realicen cambios al plan. La capacitación adicional puede limitarse a abordar el nuevo peligro de violencia laboral o los cambios en el plan.</li>
</ul>`
            },
            {
                id: "wvpp_records",
                title: "Record Keeping & Employee Access / Registro y Acceso a Expedientes",
                content_template: `<h2>13. Record Keeping</h2>
<p>In accordance with laws and legal best practices, the Company keeps records of workplace violence hazard identification, evaluation, and correction for a minimum of 5 years.</p>
<ul>
    <li>Records of workplace security hazard assessment inspections, including the person(s) conducting the inspection, the concerns identified, and the action taken to correct them, are recorded on a hazard assessment and correction form and maintained for a minimum of 5 years.</li>
    <li>Training records shall be created and maintained for a minimum of 1 year and include training dates, contents or a summary of training, names and qualifications of trainers, and names and job titles of all attendees.</li>
    <li>Violent incident logs shall be maintained for a minimum of 5 years.</li>
    <li>Records of workplace violence incident investigations conducted shall be maintained for a minimum of 5 years. These records shall not contain “medical information”.</li>
    <li>All required records shall be made available to authorities upon request for examination and copying.</li>
    <li>All required records shall also be made available to employees and their representatives, upon request and without cost, for examination and copying within 15 calendar days of a request.</li>
</ul>`,
                content_template_es: `<h2>13. Mantenimiento de Registros</h2>
<p>De acuerdo con las leyes y las mejores prácticas legales, la Empresa conserva los registros de identificación, evaluación y corrección de peligros de violencia laboral por un mínimo de 5 años.</p>
<ul>
    <li>Los registros de las inspecciones de evaluación de peligros de seguridad laboral, incluyendo la(s) persona(s) que realiza(n) la inspección, las inquietudes identificadas y las medidas tomadas para corregirlas, se registran en un formulario de evaluación y corrección de peligros y se mantienen por un mínimo de 5 años.</li>
    <li>Los registros de capacitación se crearán y mantendrán por un mínimo de 1 año e incluirán las fechas de capacitación, el contenido o un resumen de las sesiones de capacitación, los nombres y calificaciones de las personas que realizaron la capacitación, y los nombres y puestos de trabajo de todos los asistentes.</li>
    <li>Los registros de incidentes violentos se mantendrán por un mínimo de 5 años.</li>
    <li>Los registros de las investigaciones de incidentes de violencia laboral se mantendrán por un mínimo de 5 años. Estos registros no contendrán "información médica".</li>
    <li>Todos los registros requeridos se pondrán a disposición de las autoridades a solicitud para su examen y copia.</li>
    <li>Todos los registros requeridos también se pondrán a disposición de los empleados y sus representantes, a solicitud y sin costo, para su examen y copia dentro de los 15 días calendario posteriores a la solicitud.</li>
</ul>`
            },
            {
                id: "wvpp_signoff",
                title: "Program Authorization / Autorización del Programa",
                content_template: `<h2>14. Employee Access, Records Access & Employer Reporting</h2>
<h3>14.1 Employee Access to the Written WVPP</h3>
<p>{{client_name}} ensures that the WVPP plan shall be in writing and shall always be available and easily accessible to employees, authorized employee representatives, and representatives of Cal/OSHA.</p>

<h3>14.2 Employee Access to Records</h3>
<p>The following records shall be made available to employees and their representatives, upon request and without cost, for examination and copying within 15 calendar days of a request:</p>
<ul>
    <li>Records of workplace violence hazard identification, evaluation, and correction.</li>
    <li>Training records.</li>
    <li>Violent incident logs.</li>
</ul>

<h3>14.3 Employer Reporting Responsibilities</h3>
<p>As required by California Code of Regulations (CCR), Title 8, Section 342(a), Reporting Work-Connected Fatalities and Serious Injuries, {{client_name}} will immediately report to Cal/OSHA any serious injury or illness (as defined by CCR, Title 8, Section 330(h)), or death (including any due to Workplace Violence) of an employee occurring in a place of employment or in connection with any employment.</p>

<div style="margin-top: 2rem; border-top: 2px solid #000; padding-top: 1.5rem;">
    <p>"I, {{wvpp_administrator_name}}, {{wvpp_administrator_title}} of {{client_name}} hereby authorize and ensure, the establishment, implementation, and maintenance of this written workplace violence prevention plan and the documents/forms within this written plan. I believe that these policies and procedures will bring positive changes to the workflow, business operations, and overall health and safety as it relates to workplace violence prevention."</p>
    <table style="width: 100%; margin-top: 2rem;" cellpadding="6">
        <tr>
            <td style="width: 50%;">
                _______________________________________<br>
                <strong>Authorized Signature</strong>
            </td>
            <td>
                ___________________<br>
                <strong>Date</strong>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding-top: 1rem;">
                <strong>Name:</strong> {{wvpp_administrator_name}}<br>
                <strong>Title:</strong> {{wvpp_administrator_title}}, {{client_name}}
            </td>
        </tr>
    </table>
</div>`,
                content_template_es: `<h2>14. Acceso del Empleado, Acceso a Registros y Reportes del Empleador</h2>
<h3>14.1 Acceso de los Empleados al Plan Escrito</h3>
<p>{{client_name}} garantiza que el plan WVPP estará por escrito y siempre estará disponible y será fácilmente accesible para los empleados, los representantes autorizados de los empleados y los representantes de Cal/OSHA.</p>

<h3>14.2 Acceso de los Empleados a los Registros</h3>
<p>Los siguientes registros se pondrán a disposición de los empleados y sus representantes, a solicitud y sin costo, para su examen y copia dentro de los 15 días calendario posteriores a la solicitud:</p>
<ul>
    <li>Registros de identificación, evaluación y corrección de peligros de violencia laboral.</li>
    <li>Registros de capacitación.</li>
    <li>Registros de incidentes violentos.</li>
</ul>

<h3>14.3 Responsabilidades de Reporte del Empleador</h3>
<p>Según lo requerido por el Código de Regulaciones de California (CCR), Título 8, Sección 342(a), Reporte de Muertes y Lesiones Graves Relacionadas con el Trabajo, {{client_name}} reportará inmediatamente a Cal/OSHA cualquier lesión o enfermedad grave (según se define en CCR, Título 8, Sección 330(h)), o muerte (incluyendo cualquiera debida a Violencia Laboral) de un empleado que ocurra en un lugar de empleo o en conexión con cualquier empleo.</p>

<div style="margin-top: 2rem; border-top: 2px solid #000; padding-top: 1.5rem;">
    <p>"Yo, {{wvpp_administrator_name}}, {{wvpp_administrator_title}} de {{client_name}} por la presente autorizo y garantizo el establecimiento, implementación y mantenimiento de este plan escrito de prevención de violencia laboral y de los documentos/formularios contenidos en este plan escrito. Creo que estas políticas y procedimientos traerán cambios positivos al flujo de trabajo, las operaciones comerciales y la salud y seguridad en general en lo que respecta a la prevención de la violencia en el lugar de trabajo."</p>
    <table style="width: 100%; margin-top: 2rem;" cellpadding="6">
        <tr>
            <td style="width: 50%;">
                _______________________________________<br>
                <strong>Firma Autorizada</strong>
            </td>
            <td>
                ___________________<br>
                <strong>Fecha</strong>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding-top: 1rem;">
                <strong>Nombre:</strong> {{wvpp_administrator_name}}<br>
                <strong>Puesto:</strong> {{wvpp_administrator_title}}, {{client_name}}
            </td>
        </tr>
    </table>
</div>`
            },
            {
                id: "wvpp_log",
                title: "Violent Incident Log Form / Formulario de Registro de Incidentes Violentos",
                content_template: `<div class="print-page-break"></div>
<h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">VIOLENT INCIDENT LOG</h2>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color);" border="1" cellpadding="8">
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; width: 30%;">Date of Incident:</td>
        <td style="width: 70%;">________________________________ (Day, Month, Year)</td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Time of Incident:</td>
        <td>________________________________ AM / PM</td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Location of Incident:</td>
        <td>________________________________________________________________</td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Workplace Violence Type:</td>
        <td>
            [ ] <strong>Type 1:</strong> Violence by person with no legitimate business at worksite (e.g. criminal intent)<br>
            [ ] <strong>Type 2:</strong> Violence directed at employees by customers, clients, visitors, etc.<br>
            [ ] <strong>Type 3:</strong> Violence against an employee by a present/former employee, supervisor, or manager<br>
            [ ] <strong>Type 4:</strong> Violence by person who has personal relationship with employee (domestic violence at work)
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Incident Characteristics:</td>
        <td>
            [ ] Physical attack without weapon (biting, choking, grabbing, kicking, punching, pushing, spitting, etc.)<br>
            [ ] Attack with weapon or object (firearm, knife, or other object)<br>
            [ ] Threat of physical force or threat of use of a weapon or object<br>
            [ ] Sexual assault or threat (rape, attempted rape, physical display, unwanted sexual contact)<br>
            [ ] Animal attack<br>
            [ ] Other: ________________________________________________________________
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Detailed Description:</td>
        <td style="height: 100px; vertical-align: top; color: var(--text-muted);">
            Provide a detailed description of the incident, circumstances leading up to it, what occurred, and what it included:<br><br>
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Committed By:</td>
        <td>[ ] Customer/Client [ ] Employee/Supervisor [ ] Stranger [ ] Spouse/Partner [ ] Other: _____________</td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Consequences of Incident:</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">
            Describe consequences (security intervention, police involvement, work stoppage):<br><br>
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Injuries & Treatment:</td>
        <td>
            Were there any injuries? [ ] Yes [ ] No<br>
            Explain injuries: ________________________________________________________________<br>
            Were emergency medical responders contacted? [ ] Yes [ ] No<br>
            If yes, explain: ________________________________________________________________
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Cal/OSHA Reporting:</td>
        <td>
            Did the injuries require reporting to Cal/OSHA? [ ] Yes [ ] No<br>
            If yes, Date/Time reported: ___________________ Cal/OSHA Rep Name: ___________________
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Employer Notification:</td>
        <td>Copy of log provided to employer? [ ] Yes [ ] No. Date provided: ____________ To whom: ____________</td>
    </tr>
</table>
<table style="width: 100%; margin-top: 1.5rem;" cellpadding="6">
    <tr>
        <td><strong>Completed By:</strong> ________________________________</td>
        <td><strong>Job Title:</strong> ________________________________</td>
    </tr>
    <tr>
        <td><strong>Signature:</strong> ________________________________</td>
        <td><strong>Date:</strong> ________________________________</td>
    </tr>
</table>`,
                content_template_es: `<div class="print-page-break"></div>
<h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">REGISTRO DE INCIDENTES VIOLENTOS</h2>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color);" border="1" cellpadding="8">
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; width: 30%;">Fecha del Incidente:</td>
        <td style="width: 70%;">________________________________ (Día, Mes, Año)</td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Hora del Incidente:</td>
        <td>________________________________ AM / PM</td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Ubicación del Incidente:</td>
        <td>________________________________________________________________</td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Tipo de Violencia Laboral:</td>
        <td>
            [ ] <strong>Tipo 1:</strong> Violencia por persona sin negocio legítimo (ej. intención delictiva)<br>
            [ ] <strong>Tipo 2:</strong> Violencia dirigida a empleados por clientes, usuarios, visitantes, etc.<br>
            [ ] <strong>Tipo 3:</strong> Violencia contra un empleado por un empleado actual/anterior, supervisor o gerente<br>
            [ ] <strong>Tipo 4:</strong> Violencia por persona con relación personal con un empleado (violencia doméstica en el trabajo)
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Características del Incidente:</td>
        <td>
            [ ] Ataque físico sin armas (morder, estrangular, sujetar, patear, golpear, empujar, escupir, etc.)<br>
            [ ] Ataque con arma u objeto (arma de fuego, cuchillo u otro objeto)<br>
            [ ] Amenaza de fuerza física o amenaza de uso de arma u objeto<br>
            [ ] Agresión o amenaza sexual (violación, intento de violación, exhibición física, contacto no deseado)<br>
            [ ] Ataque de animal<br>
            [ ] Otro: ________________________________________________________________
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Descripción Detallada:</td>
        <td style="height: 100px; vertical-align: top; color: var(--text-muted);">
            Proporcione una descripción detallada del incidente, las circunstancias que lo provocaron y lo que incluyó:<br><br>
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Cometido Por:</td>
        <td>[ ] Cliente [ ] Empleado/Supervisor [ ] Desconocido [ ] Cónyuge/Pareja [ ] Otro: _____________</td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Consecuencias del Incidente:</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">
            Describa las consecuencias (intervención de seguridad, participación de la policía, paro de labores):<br><br>
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold; vertical-align: top;">Lesiones y Tratamiento:</td>
        <td>
            ¿Hubo lesiones? [ ] Sí [ ] No<br>
            Explique las lesiones: ________________________________________________________________<br>
            ¿Se contactó a personal médico de emergencia? [ ] Sí [ ] No<br>
            En caso afirmativo, explique: ________________________________________________________________
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Reporte a Cal/OSHA:</td>
        <td>
            ¿Las lesiones requirieron reporte a Cal/OSHA? [ ] Sí [ ] No<br>
            En caso afirmativo, Fecha/Hora del reporte: ___________________ Nombre de Rep de Cal/OSHA: ___________________
        </td>
    </tr>
    <tr>
        <td style="background-color: var(--bg-base); font-weight: bold;">Notificación al Empleador:</td>
        <td>¿Se entregó copia del registro al empleador? [ ] Sí [ ] No. Fecha de entrega: ____________ A quién: ____________</td>
    </tr>
</table>
<table style="width: 100%; margin-top: 1.5rem;" cellpadding="6">
    <tr>
        <td><strong>Completado Por:</strong> ________________________________</td>
        <td><strong>Puesto de Trabajo:</strong> ________________________________</td>
    </tr>
    <tr>
        <td><strong>Firma:</strong> ________________________________</td>
        <td><strong>Date:</strong> ________________________________</td>
    </tr>
</table>`
            }
        ]
    },
    {
        id: "epp",
        name: "Emergency Action Plan (EAP)",
        abbreviation: "EAP",
        content_template: `<div style="text-align: center; margin-bottom: 2rem;">
    <h1 style="font-size: 2.25rem; margin-bottom: 0.25rem;">{{client_name}}</h1>
    <h2 style="font-size: 1.75rem; color: var(--accent-purple); margin-top: 0; margin-bottom: 0.5rem;">EMERGENCY ACTION PLAN (EAP)</h2>
    <p style="font-size: 0.95rem; font-style: italic; color: var(--text-secondary);">(Per CCR Title 8, Section 3220 – Version {{eap_version}} Dated {{eap_date}})</p>
</div>
<div style="background-color: var(--bg-base); border: 1.5px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
    <h3 style="margin-top: 0; margin-bottom: 1rem; border-bottom: 1.5px solid var(--border-color); padding-bottom: 0.5rem; font-size: 1.15rem;">Facility Information</h3>
    <ul style="list-style: none; padding-left: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem;">
        <li>📍 <strong>Program:</strong> {{eap_program_name}}</li>
        <li>🏢 <strong>Address:</strong> {{client_address}}</li>
        <li>📞 <strong>Phone:</strong> {{client_phone}}</li>
        <li>👤 <strong>Emergency Coordinator:</strong> {{safety_officer}} ({{safety_officer_title}})</li>
    </ul>
</div>`,
        content_template_es: `<div style="text-align: center; margin-bottom: 2rem;">
    <h1 style="font-size: 2.25rem; margin-bottom: 0.25rem;">{{client_name}}</h1>
    <h2 style="font-size: 1.75rem; color: var(--accent-purple); margin-top: 0; margin-bottom: 0.5rem;">PLAN DE ACCIÓN DE EMERGENCIA (EAP)</h2>
    <p style="font-size: 0.95rem; font-style: italic; color: var(--text-secondary);">(Según CCR Título 8, Sección 3220 – Versión {{eap_version}} Fechada {{eap_date}})</p>
</div>
<div style="background-color: var(--bg-base); border: 1.5px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
    <h3 style="margin-top: 0; margin-bottom: 1rem; border-bottom: 1.5px solid var(--border-color); padding-bottom: 0.5rem; font-size: 1.15rem;">Información de la Instalación</h3>
    <ul style="list-style: none; padding-left: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem;">
        <li>📍 <strong>Programa:</strong> {{eap_program_name}}</li>
        <li>🏢 <strong>Dirección:</strong> {{client_address}}</li>
        <li>📞 <strong>Teléfono:</strong> {{client_phone}}</li>
        <li>👤 <strong>Coordinador de Emergencia:</strong> {{safety_officer}} ({{safety_officer_title}})</li>
    </ul>
</div>`,
        subsections: [
            {
                id: "eap_scope",
                title: "Purpose & Scope / Propósito y Alcance",
                content_template: `<h2>PURPOSE & SCOPE [T8 CCR §3220(a)]</h2>
<p>This Emergency Action Plan (EAP) establishes procedures for responding to emergencies that may occur during office operations and field work at residential homes for {{client_name}}. The intent is to ensure employee safety from fire, environmental hazards, medical emergencies, and violent incidents.</p>`,
                content_template_es: `<h2>PROPÓSITO Y ALCANCE [T8 CCR §3220(a)]</h2>
<p>Este Plan de Acción de Emergencia (EAP) establece procedimientos para responder a las emergencias que puedan ocurrir durante las operaciones de oficina y el trabajo de campo en hogares residenciales para {{client_name}}. La intención es garantizar la seguridad de los empleados frente a incendios, peligros ambientales, emergencias médicas e incidentes violentos.</p>`
            },
            {
                id: "eap_evac",
                title: "Evacuation Procedures / Procedimientos de Evacuación",
                content_template: `<h2>SECTION A – EMERGENCY EVACUATION PROCEDURES [T8 CCR §3220(b)(1)]</h2>
<h3>General Evacuation Procedures (Office & Field)</h3>
<ol>
    <li><strong>STOP</strong> work immediately upon recognition of an emergency.</li>
    <li>Secure equipment if safe to do so (turn off power tools, ladders, gas lines).</li>
    <li><strong>WALK – DO NOT RUN</strong> to the nearest safe exit or away from hazard.</li>
    <li><strong>Field Employees:</strong>
        <ul>
            <li>Exit the residence immediately.</li>
            <li>Move to a safe location (street/sidewalk away from structure).</li>
        </ul>
    </li>
    <li>Proceed to designated staging area:
        <ul>
            <li><strong>Office:</strong> {{eap_office_staging_area}}</li>
            <li><strong>Field:</strong> {{eap_field_staging_area}}</li>
        </ul>
    </li>
    <li>Remain at staging area for accountability and instructions.</li>
</ol>`,
                content_template_es: `<h2>SECCIÓN A – PROCEDIMIENTOS DE EVACUACIÓN DE EMERGENCIA [T8 CCR §3220(b)(1)]</h2>
<h3>Procedimientos Generales de Evacuación (Oficina y Campo)</h3>
<ol>
    <li><strong>DETENGA</strong> el trabajo inmediatamente al reconocer una emergencia.</li>
    <li>Asegure el equipo si es seguro hacerlo (apague herramientas eléctricas, asegure escaleras, líneas de gas).</li>
    <li><strong>CAMINE – NO CORRA</strong> hacia la salida segura más cercana o lejos del peligro.</li>
    <li><strong>Empleados de Campo:</strong>
        <ul>
            <li>Salga de la residencia de inmediato.</li>
            <li>Trasládese a una ubicación segura (calle/acera lejos de la estructura).</li>
        </ul>
    </li>
    <li>Proceda al área de reunión designada:
        <ul>
            <li><strong>Oficina:</strong> {{eap_office_staging_area}}</li>
            <li><strong>Campo:</strong> {{eap_field_staging_area}}</li>
        </ul>
    </li>
    <li>Permanezca en el área de reunión para el recuento de personal e instrucciones.</li>
</ol>`
            },
            {
                id: "eap_critical_ops",
                title: "Critical Operations / Operaciones Críticas",
                content_template: `<h2>SECTION B – CRITICAL OPERATIONS BEFORE EVACUATION [T8 CCR §3220(b)(2)]</h2>
<p>Employees may perform limited actions ONLY if safe. Examples:</p>
<ul>
    <li><strong>Shut off:</strong>
        <ul>
            <li>Gas lines (specifically at water heaters or main controls)</li>
            <li>Electrical circuits</li>
            <li>Power tools</li>
        </ul>
    </li>
    <li>Stabilize ladders or remove immediate hazards</li>
</ul>
<p style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 0.5rem; margin-top: 1rem; font-weight: bold; color: #b91c1c;">
    ⚠ IF ANY ACTION PUTS YOU AT RISK — EVACUATE IMMEDIATELY
</p>`,
                content_template_es: `<h2>SECCIÓN B – OPERACIONES CRÍTICAS ANTES DE LA EVACUACIÓN [T8 CCR §3220(b)(2)]</h2>
<p>Los empleados pueden realizar acciones limitadas ÚNICAMENTE si es seguro hacerlo. Ejemplos:</p>
<ul>
    <li><strong>Cerrar/Apagar:</strong>
        <ul>
            <li>Líneas de gas (específicamente en calentadores de agua o controles principales)</li>
            <li>Circuitos eléctricos</li>
            <li>Herramientas eléctricas</li>
        </ul>
    </li>
    <li>Estabilizar escaleras o eliminar peligros inmediatos</li>
</ul>
<p style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 0.5rem; margin-top: 1rem; font-weight: bold; color: #b91c1c;">
    ⚠ SI CUALQUIER ACCIÓN LO PONE EN RIESGO — EVACÚE DE INMEDIATO
</p>`
            },
            {
                id: "eap_accounting",
                title: "Employee Accountability / Contabilización de Personal",
                content_template: `<h2>SECTION C – ACCOUNTING FOR EMPLOYEES [T8 CCR §3220(b)(3)]</h2>
<ol>
    <li>All employees must report to the designated staging area.</li>
    <li>The Supervisor/Lead Technician conducts headcount using the daily crew roster.</li>
    <li>Missing employees must be reported immediately to:
        <ul>
            <li>Emergency Coordinator ({{safety_officer}})</li>
            <li>Emergency Responders (Fire/Police)</li>
        </ul>
    </li>
    <li><strong>NO ONE</strong> leaves the staging area until accountability is complete.</li>
</ol>`,
                content_template_es: `<h2>SECCIÓN C – CONTABILIZACIÓN DE EMPLEADOS [T8 CCR §3220(b)(3)]</h2>
<ol>
    <li>Todos los empleados deben reportarse al área de reunión designada.</li>
    <li>El Supervisor/Técnico Líder realiza el recuento de personal utilizando la lista diaria de la tripulación.</li>
    <li>Los empleados desaparecidos deben ser reportados inmediatamente a:
        <ul>
            <li>Coordinador de Emergencia ({{safety_officer}})</li>
            <li>Personal de Respuesta a Emergencias (Bomberos/Policía)</li>
        </ul>
    </li>
    <li><strong>NADIE</strong> se retira hasta que se complete la contabilización de personal.</li>
</ol>`
            },
            {
                id: "eap_rescue_medical",
                title: "Rescue & Medical Duties / Deberes de Rescate y Médicos",
                content_template: `<h2>SECTION D – RESCUE & MEDICAL DUTIES [T8 CCR §3220(b)(4)]</h2>
<ul>
    <li>Employees are <strong>NOT</strong> required or permitted to perform rescue operations.</li>
    <li>Designated trained personnel may provide:
        <ul>
            <li>First Aid / CPR (if trained and certified)</li>
        </ul>
    </li>
    <li>All employees must: <strong>Call 9-1-1 immediately</strong> in a life-threatening situation.</li>
    <li>Provide 9-1-1 operators with:
        <ol>
            <li>Exact address/location of the emergency</li>
            <li>Nature of the emergency</li>
            <li>Number of injured individuals</li>
        </ol>
    </li>
    <li>Assign someone to: (1) Meet emergency responders and (2) Guide them to the exact location of the emergency.</li>
</ul>
<p><strong>NOTE:</strong> All field employees MUST identify the exact job site address prior to starting work each day. This address should be used when calling 9-1-1, OR the specific job address at the time of the emergency. {{client_name}} DOES NOT maintain a fire brigade. Employees are not required or expected to fight fires.</p>`,
                content_template_es: `<h2>SECCIÓN D – DEBERES DE RESCATE Y AUXILIOS MÉDICOS [T8 CCR §3220(b)(4)]</h2>
<ul>
    <li>Los empleados <strong>NO</strong> están obligados ni autorizados a realizar operaciones de rescate.</li>
    <li>El personal capacitado designado puede brindar:
        <ul>
            <li>Primeros Auxilios / RCP (si están capacitados y certificados)</li>
        </ul>
    </li>
    <li>Todos los empleados deben: <strong>Llamar al 9-1-1 de inmediato</strong> en una situación de peligro vital.</li>
    <li>Proporcionar a los operadores del 9-1-1:
        <ol>
            <li>Dirección/ubicación exacta de la emergencia</li>
            <li>Naturaleza de la emergencia</li>
            <li>Número de personas lesionadas</li>
        </ol>
    </li>
    <li>Asignar a alguien para: (1) Recibir al personal de respuesta a emergencias y (2) Guiarlos a la ubicación exacta de la emergencia.</li>
</ul>
<p><strong>NOTA:</strong> Todos los empleados de campo DEBEN identificar la dirección exacta del sitio de trabajo antes de comenzar a trabajar cada día. Esta dirección debe usarse al llamar al 9-1-1, O la dirección específica del trabajo en el momento de la emergencia. {{client_name}} NO cuenta con una brigada de bomberos. Los empleados no están obligados a combatir incendios.</p>`
            },
            {
                id: "eap_reporting",
                title: "Reporting Emergencies / Reportar Emergencias",
                content_template: `<h2>SECTION E – REPORTING EMERGENCIES [T8 CCR §3220(b)(5) & (c)]</h2>
<h3>Preferred Reporting Methods</h3>
<ul>
    <li><strong>Primary Method:</strong> Call 9-1-1</li>
    <li><strong>Secondary Method:</strong> Notify Supervisor / {{safety_officer}}</li>
</ul>
<h3>Alarm System (Field Adapted)</h3>
<ul>
    <li><strong>Verbal Alert:</strong> Shout "EMERGENCY – EVACUATE" or "EMERGENCY – SHELTER IN PLACE"</li>
    <li>Air horn / phone communication (if available at the job site)</li>
</ul>`,
                content_template_es: `<h2>SECCIÓN E – REPORTE DE EMERGENCIAS [T8 CCR §3220(b)(5) y (c)]</h2>
<h3>Métodos Preferidos de Reporte</h3>
<ul>
    <li><strong>Método Primario:</strong> Llamar al 9-1-1</li>
    <li><strong>Método Secundario:</strong> Notificar al Supervisor / {{safety_officer}}</li>
</ul>
<h3>Sistema de Alarma (Adaptado al Campo)</h3>
<ul>
    <li><strong>Alerta Verbal:</strong> Gritar "EMERGENCIA – EVACUAR" o "EMERGENCIA – REFUGIARSE EN EL LUGAR"</li>
    <li>Bocina de aire / comunicación telefónica (si está disponible en el sitio de trabajo)</li>
</ul>`
            },
            {
                id: "eap_responsible",
                title: "Responsible Persons / Personas Responsables",
                content_template: `<h2>SECTION F – RESPONSIBLE PERSONS [T8 CCR §3220(b)(6)]</h2>
<p>The following individuals are responsible for carrying out specific duties under this plan:</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;" border="1" cellpadding="8">
    <thead>
        <tr style="background-color: var(--bg-base);">
            <th style="width: 30%;">Name</th>
            <th style="width: 30%;">Title</th>
            <th>EAP Responsibility</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>{{safety_officer}}</strong></td>
            <td>{{safety_officer_title}}</td>
            <td><strong>Emergency Coordinator:</strong> Implementation of EAP, training compliance, emergency services coordination, and post-incident documentation.</td>
        </tr>
        <tr>
            <td><strong>Field Supervisors</strong></td>
            <td>Crew Leads / Foremen</td>
            <td><strong>On-site Emergency Control:</strong> Coordinate immediate evacuations, conduct headcounts, and report missing workers.</td>
        </tr>
        <tr>
            <td><strong>Office Staff</strong></td>
            <td>Admin / HR</td>
            <td><strong>Communication & Coordination:</strong> Liaison with coordinator, notify staff, and document training logs.</td>
        </tr>
    </tbody>
</table>`,
                content_template_es: `<h2>SECCIÓN F – PERSONAS RESPONSABLES [T8 CCR §3220(b)(6)]</h2>
<p>Las siguientes personas son responsables de cumplir con deberes específicos bajo este plan:</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;" border="1" cellpadding="8">
    <thead>
        <tr style="background-color: var(--bg-base);">
            <th style="width: 30%;">Nombre</th>
            <th style="width: 30%;">Puesto</th>
            <th>Responsabilidad del EAP</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>{{safety_officer}}</strong></td>
            <td>{{safety_officer_title}}</td>
            <td><strong>Coordinador de Emergencia:</strong> Conducir la implementación del EAP, cumplimiento de la capacitación, coordinación de servicios de emergencia y documentación post-incidente.</td>
        </tr>
        <tr>
            <td><strong>Supervisores de Campo</strong></td>
            <td>Líderes de Equipo / Capataces</td>
            <td><strong>Control de Emergencia en el Sitio:</strong> Coordinar evacuaciones inmediatas, realizar recuentos de personal y reportar trabajadores desaparecidos.</td>
        </tr>
        <tr>
            <td><strong>Personal de Oficina</strong></td>
            <td>Administración / RRHH</td>
            <td><strong>Comunicación y Coordinación:</strong> Enlace con el coordinador, notificar al personal y documentar los registros de capacitación.</td>
        </tr>
    </tbody>
</table>`
            },
            {
                id: "eap_evac_types",
                title: "Types of Evacuation / Tipos de Evacuación",
                content_template: `<h2>SECTION G – TYPES OF EVACUATION [T8 CCR §3220(d)]</h2>
<ol>
    <li><strong>Immediate Evacuation:</strong>
        <ul>
            <li>Fire</li>
            <li>Gas leak</li>
            <li>Structural instability</li>
        </ul>
    </li>
    <li><strong>Shelter-in-Place:</strong>
        <ul>
            <li>Active shooter nearby</li>
            <li>Severe weather</li>
        </ul>
    </li>
    <li><strong>Controlled Evacuation:</strong>
        <ul>
            <li>Earthquake aftermath</li>
            <li>Medical emergency scene control</li>
        </ul>
    </li>
</ol>`,
                content_template_es: `<h2>SECCIÓN G – TIPOS DE EVACUACIÓN [T8 CCR §3220(d)]</h2>
<ol>
    <li><strong>Evacuación Inmediata:</strong>
        <ul>
            <li>Incendio</li>
            <li>Fuga de gas</li>
            <li>Inestabilidad estructural</li>
        </ul>
    </li>
    <li><strong>Refugio en el Lugar (Shelter-in-Place):</strong>
        <ul>
            <li>Atacante activo cercano</li>
            <li>Clima severo</li>
        </ul>
    </li>
    <li><strong>Evacuación Controlled:</strong>
        <ul>
            <li>Después de un sismo (terremoto)</li>
            <li>Control de escena de emergencia médica</li>
        </ul>
    </li>
</ol>`
            },
            {
                id: "eap_procedures",
                title: "Emergency-Specific Procedures / Procedimientos de Emergencias Específicas",
                content_template: `<h2>SECTION H – EMERGENCY-SPECIFIC PROCEDURES</h2>
<p><em>(Note: Employees are NOT required to fight fires. Evacuation is the primary response.)</em></p>

<h3>FIRE</h3>
<ol>
    <li>Alert others and evacuate immediately.</li>
    <li>Call 9-1-1.</li>
    <li>Use a fire extinguisher <strong>ONLY</strong> on small (incipient-stage) fires, and only if trained and it is safe to do so.</li>
    <li>Stay low if smoke is present.</li>
</ol>

<h3>EARTHQUAKE</h3>
<ul>
    <li><strong>INDOORS:</strong> Duck, Cover, Hold.</li>
    <li><strong>ON ROOF:</strong> Stay in place, avoid edges.</li>
    <li><strong>OUTDOORS:</strong> Move away from structures, power lines, and trees.</li>
    <li><strong>After shaking:</strong>
        <ul>
            <li>Evacuate safely.</li>
            <li>Watch for gas or water leaks, and electrical hazards (e.g. damaged/loose electrical wires, sparking wires, etc.).</li>
        </ul>
    </li>
</ul>

<h3>ACTIVE SHOOTER</h3>
<ol>
    <li><strong>RUN</strong> – escape if possible.</li>
    <li><strong>HIDE</strong> – lock doors, silence phones, barricade entries.</li>
    <li><strong>FIGHT</strong> – act only as a last resort.</li>
    <li>Call 9-1-1 when safe.</li>
    <li><strong>DO NOT</strong> re-enter until cleared by law enforcement.</li>
</ol>

<h3>LIFE-THREATENING INJURY</h3>
<ol>
    <li>Call 9-1-1.</li>
    <li>Provide clear directions.</li>
    <li><strong>Do NOT</strong> move the injured person unless necessary for their safety.</li>
    <li>Provide first aid if trained and certified.</li>
</ol>

<h3>HEAT EXPOSURE (Field Hazard)</h3>
<ol>
    <li>Move worker to shade.</li>
    <li>Provide cool water.</li>
    <li>Cool the body (wet cloths, airflow).</li>
    <li>Call 9-1-1 if:
        <ul>
            <li>Confusion / Slurred speech</li>
            <li>Loss of consciousness</li>
        </ul>
    </li>
    <li>Supervisor shall monitor affected employee and ensure emergency response if symptoms escalate.</li>
</ol>

<h3>FALL / LADDER INCIDENT</h3>
<ol>
    <li><strong>Do NOT</strong> move victim.</li>
    <li>Call 9-1-1.</li>
    <li>Secure the area and ladder for inspection.</li>
</ol>

<h3>ROOF WORK / STRUCTURAL FAILURE</h3>
<ol>
    <li>Evacuate immediately.</li>
    <li>Keep others away from hazard zone.</li>
    <li>Notify supervisor.</li>
</ol>

<h3>LEAD / HAZARDOUS EXPOSURE</h3>
<ol>
    <li>Stop work immediately.</li>
    <li>Avoid contact.</li>
    <li>Wash exposed areas.</li>
    <li>Report to supervisor.</li>
</ol>

<h3>WATER HEATER / GAS INCIDENT</h3>
<ol>
    <li>Evacuate area immediately.</li>
    <li><strong>DO NOT</strong> operate electrical switches (prevents sparking).</li>
    <li>Call 9-1-1 and notify supervisor.</li>
</ol>`,
                content_template_es: `<h2>SECCIÓN H – PROCEDIMIENTOS DE EMERGENCIAS ESPECÍFICAS</h2>
<p><em>(Nota: Los empleados NO están obligados a combatir incendios. La evacuación es la respuesta principal.)</em></p>

<h3>INCENDIO</h3>
<ol>
    <li>Alerte a otros y evacúe inmediatamente.</li>
    <li>Llamar al 9-1-1.</li>
    <li>Use un extintor de incendios <strong>ÚNICAMENTE</strong> en incendios pequeños (etapa incipiente), y solo si está capacitado y es seguro hacerlo.</li>
    <li>Permanezca bajo si hay humo.</li>
</ol>

<h3>TERREMOTO / SISMO</h3>
<ul>
    <li><strong>EN INTERIORES:</strong> Agáchese, Cúbrase, Sujétese.</li>
    <li><strong>EN EL TECHO:</strong> Quédese en su lugar, evite los bordes.</li>
    <li><strong>EN EXTERIORES:</strong> Aléjese de estructuras, líneas eléctricas y árboles.</li>
    <li><strong>Después del temblor:</strong>
        <ul>
            <li>Evacúe de forma segura.</li>
            <li>Esté atento a fugas de gas o agua, y peligros eléctricos (por ejemplo, cables eléctricos dañados/sueltos, cables con chispas, etc.).</li>
        </ul>
    </li>
</ul>

<h3>ATACANTE ACTIVO</h3>
<ol>
    <li><strong>CORRER</strong> – escapar si es posible.</li>
    <li><strong>ESCONDERSE</strong> – cerrar puertas con llave, silenciar teléfonos, bloquear entradas.</li>
    <li><strong>PELEAR</strong> – actuar solo como último recurso.</li>
    <li>Llamar al 9-1-1 cuando sea seguro.</li>
    <li><strong>NO</strong> vuelva a entrar hasta que lo autoricen las fuerzas del orden.</li>
</ol>

<h3>LESIÓN GRAVE CON RIESGO VITAL</h3>
<ol>
    <li>Llamar al 9-1-1.</li>
    <li>Proporcionar direcciones claras.</li>
    <li><strong>NO</strong> mueva a la persona lesionada a menos que sea necesario para su seguridad.</li>
    <li>Brinde primeros auxilios si está capacitado y certificado.</li>
</ol>

<h3>EXPOSICIÓN AL CALOR (Peligro en el Campo)</h3>
<ol>
    <li>Mueva al trabajador a la sombra.</li>
    <li>Proporcione agua fresca.</li>
    <li>Enfríe el cuerpo (paños húmedos, flujo de aire).</li>
    <li>Llame al 9-1-1 si observa:
        <ul>
            <li>Confusión / Dificultad para hablar</li>
            <li>Pérdida del conocimiento</li>
        </ul>
    </li>
    <li>El supervisor debe monitorear al empleado afectado y garantizar respuesta de emergencia si los síntomas empeoran.</li>
</ol>

<h3>CAÍDA / INCIDENTE DE ESCALERA</h3>
<ol>
    <li><strong>NO</strong> mueva a la víctima.</li>
    <li>Llamar al 9-1-1.</li>
    <li>Asegure el área y la escalera para su inspección.</li>
</ol>

<h3>TRABAJO EN TECHO / FALLA ESTRUCTURAL</h3>
<ol>
    <li>Evacúe inmediatamente.</li>
    <li>Mantenga a otros alejados de la zona de peligro.</li>
    <li>Notifique al supervisor.</li>
</ol>

<h3>EXPOSICIÓN A PLOMO / QUÍMICOS PELIGROSOS</h3>
<ol>
    <li>Detenga el trabajo de inmediato.</li>
    <li>Evite el contacto.</li>
    <li>Lave las áreas expuestas.</li>
    <li>Reporte al supervisor.</li>
</ol>

<h3>INCIDENTE DE CALENTADOR DE AGUA / GAS</h3>
<ol>
    <li>Evacúe el área inmediatamente.</li>
    <li><strong>NO</strong> opere interruptores de luz o eléctricos (para evitar chispas).</li>
    <li>Llamar al 9-1-1 y notificar al supervisor.</li>
</ol>`
            },
            {
                id: "eap_training",
                title: "Training Requirements / Requisitos de Capacitación",
                content_template: `<h2>SECTION I – TRAINING REQUIREMENTS [T8 CCR §3220(e)(1)-(3)]</h2>
<p>Training shall occur:</p>
<ul>
    <li>At initial hire</li>
    <li>Initially when the plan is developed or newly introduced</li>
    <li>When designated duties or emergency assignments change</li>
    <li>When the EAP plan is updated</li>
</ul>
<p><strong>NOTE:</strong> Training will be conducted at a minimum annually and fully documented. (T8 CCR §3220(e))</p>
<h3>Training Includes:</h3>
<ul>
    <li>Evacuation procedures</li>
    <li>Designated emergency roles and duties</li>
    <li>Hazard recognition (ladder, roof, lead, heat, etc.)</li>
    <li>Field-specific emergencies</li>
</ul>`,
                content_template_es: `<h2>SECCIÓN I – REQUISITOS DE CAPACITACIÓN [T8 CCR §3220(e)(1)-(3)]</h2>
<p>La capacitación se llevará a cabo:</p>
<ul>
    <li>En la contratación inicial</li>
    <li>Inicialmente cuando se desarrolla el plan o se introduce por primera vez</li>
    <li>Cuando cambien los deberes de emergencia asignados</li>
    <li>Cuando el plan EAP se actualice</li>
</ul>
<p><strong>NOTA:</strong> La capacitación se realizará como mínimo anualmente y se documentará por completo. (T8 CCR §3220(e))</p>
<h3>La Capacitación Incluye:</h3>
<ul>
    <li>Procedimientos de evacuación</li>
    <li>Funciones y deberes de emergencia designados</li>
    <li>Reconocimiento de peligros (escaleras, techos, plomo, calor, etc.)</li>
    <li>Emergencias específicas en el campo de trabajo</li>
</ul>`
            },
            {
                id: "eap_availability",
                title: "Availability & Coordinator Responsibilities / Disponibilidad y Responsabilidades",
                content_template: `<h2>SECTION J – PLAN AVAILABILITY [T8 CCR §3220(e)(3)]</h2>
<ul>
    <li>Plan maintained at: <strong>Main Office ({{client_address}} Attn: {{safety_officer}})</strong></li>
    <li>Available to all employees upon request.</li>
    <li>Field crews will receive:
        <ul>
            <li>A copy or summary of this EAP</li>
            <li>Tailgate safety review</li>
        </ul>
    </li>
</ul>

<h2>SECTION K – MANAGEMENT RESPONSIBILITIES</h2>
<h3>Emergency Coordinator ({{safety_officer}})</h3>
<ul>
    <li>Implement and maintain the EAP</li>
    <li>Coordinate emergency response operations</li>
    <li>Maintain training records and documentation</li>
    <li>Liaise with responding emergency personnel</li>
</ul>
<h3>Supervisors</h3>
<ul>
    <li>Conduct headcount using roster</li>
    <li>Direct immediate evacuations at the job site</li>
    <li>Report incidents to the Emergency Coordinator</li>
</ul>
<p style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 0.5rem; margin-top: 1rem; font-weight: bold; color: #b91c1c;">
    ⚠ NOTE: ONLY the Emergency Coordinator or responding Emergency Personnel may authorize re-entry into the work area.
</p>`,
                content_template_es: `<h2>SECCIÓN J – DISPONIBILIDAD DEL PLAN [T8 CCR §3220(e)(3)]</h2>
<ul>
    <li>Plan mantenido en: <strong>Oficina Principal ({{client_address}} Atención: {{safety_officer}})</strong></li>
    <li>Disponible para todos los empleados a solicitud.</li>
    <li>Los equipos de campo recibirán:
        <ul>
            <li>Una copia o resumen de este EAP</li>
            <li>Plática de seguridad en el campo</li>
        </ul>
    </li>
</ul>

<h2>SECCIÓN K – RESPONSABILIDADES DE LA DIRECCIÓN</h2>
<h3>Coordinador de Emergencia ({{safety_officer}})</h3>
<ul>
    <li>Implementar y mantener el plan EAP</li>
    <li>Coordinar las operaciones de respuesta a emergencias</li>
    <li>Mantener registros de capacitación y documentación</li>
    <li>Servir de enlace con el personal de respuesta a emergencias</li>
</ul>
<h3>Supervisores</h3>
<ul>
    <li>Realizar el recuento de personal utilizando la lista</li>
    <li>Dirigir evacuaciones inmediatas en el lugar de trabajo</li>
    <li>Reportar incidentes al Coordinador de Emergencia</li>
</ul>
<p style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 0.5rem; margin-top: 1rem; font-weight: bold; color: #b91c1c;">
    ⚠ NOTA: ÚNICAMENTE el Coordinador de Emergencia o el personal de emergencia de respuesta pueden autorizar el reingreso al área de trabajo.
</p>`
            },
            {
                id: "eap_contacts",
                title: "Emergency Contacts / Contactos de Emergencia",
                content_template: `<h2>SECTION L – EMERGENCY CONTACTS</h2>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;" border="1" cellpadding="8">
    <tr style="background-color: var(--bg-base); font-weight: bold;">
        <td style="width: 40%;">Contact / Agency</td>
        <td style="width: 30%;">Phone Number</td>
        <td>Notes</td>
    </tr>
    <tr>
        <td><strong>Life-Threatening Emergency</strong></td>
        <td><strong style="color: #ef4444;">9-1-1</strong></td>
        <td>Ambulance, Fire, Police</td>
    </tr>
    <tr>
        <td><strong>{{client_name}} Program Office</strong></td>
        <td>{{client_phone}}</td>
        <td>Main Administrative Line</td>
    </tr>
    <tr>
        <td><strong>Nearest Hospital</strong></td>
        <td>{{hospital_phone}}</td>
        <td><strong>{{hospital_name}}</strong><br>{{hospital_address}}</td>
    </tr>
    <tr>
        <td><strong>Department of Toxic Substances Control (DTSC)</strong></td>
        <td>{{dtsc_phone}}</td>
        <td>Statewide Number, routes to local office (El Centro). Contact for hazardous materials or environmental incidents.</td>
    </tr>
</table>

<h2>SECTION M – GENERAL SAFETY PRINCIPLES</h2>
<ul>
    <li>Remain calm.</li>
    <li>Do not panic or run.</li>
    <li>Follow instructions from supervisors.</li>
    <li>Do not re-enter the hazard area.</li>
</ul>

<div style="margin-top: 2rem; background-color: var(--bg-base); border: 1.5px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md);">
    <h3 style="margin-top: 0; color: var(--accent-purple);">COMPLIANCE SUMMARY</h3>
    <p>This plan satisfies all required elements under California Code of Regulations (CCR) Title 8:</p>
    <ul>
        <li>§3220(b)(1)-(6) - Written Plan Requirements</li>
        <li>§3220(c) - Alarm Systems</li>
        <li>§3220(d) - Evacuation Types</li>
        <li>§3220(e) - Training Requirements</li>
    </ul>
</div>`,
                content_template_es: `<h2>SECCIÓN L – CONTACTOS DE EMERGENCIA</h2>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;" border="1" cellpadding="8">
    <tr style="background-color: var(--bg-base); font-weight: bold;">
        <td style="width: 40%;">Contacto / Agencia</td>
        <td style="width: 30%;">Número de Teléfono</td>
        <td>Notas</td>
    </tr>
    <tr>
        <td><strong>Emergencia con Peligro de Vida</strong></td>
        <td><strong style="color: #ef4444;">9-1-1</strong></td>
        <td>Ambulancia, Bomberos, Policía</td>
    </tr>
    <tr>
        <td><strong>Oficina del Programa {{client_name}}</strong></td>
        <td>{{client_phone}}</td>
        <td>Línea Administrativa Principal</td>
    </tr>
    <tr>
        <td><strong>Hospital Más Cercano</strong></td>
        <td>{{hospital_phone}}</td>
        <td><strong>{{hospital_name}}</strong><br>{{hospital_address}}</td>
    </tr>
    <tr>
        <td><strong>Departamento de Control de Sustancias Tóxicas (DTSC)</strong></td>
        <td>{{dtsc_phone}}</td>
        <td>Número estatal, se desvía a la oficina local (El Centro). Contactar para incidentes químicos o materiales peligrosos.</td>
    </tr>
</table>

<h2>SECCIÓN M – PRINCIPIOS GENERALES DE SEGURIDAD</h2>
<ul>
    <li>Permanezca calmado.</li>
    <li>No entre en pánico ni corra.</li>
    <li>Siga las instrucciones de los supervisores.</li>
    <li>No vuelva a ingresar al área de peligro.</li>
</ul>

<div style="margin-top: 2rem; background-color: var(--bg-base); border: 1.5px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md);">
    <h3 style="margin-top: 0; color: var(--accent-purple);">RESUMEN DE CUMPLIMIENTO</h3>
    <p>Este plan satisface todos los elementos requeridos bajo el Código de Regulaciones de California (CCR) Título 8:</p>
    <ul>
        <li>§3220(b)(1)-(6) - Requisitos del Plan Escrito</li>
        <li>§3220(c) - Sistemas de Alarma</li>
        <li>§3220(d) - Tipos de Evacuación</li>
        <li>§3220(e) - Requisitos de Capacitación</li>
    </ul>
</div>`
            },
            {
                id: "eap_rosters",
                title: "Appendices & Record Keeping Forms / Apéndices y Formularios de Registro",
                content_template: `<div class="print-page-break"></div>
<h2>EAP Appendices & Field Worksheets</h2>
<p>The following pages contain record-keeping logs, checklists, flowcharts, and sign-in sheets to comply with Cal/OSHA requirements and assist field crews in operations.</p>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 1: EMPLOYEE ACCOUNTABILITY ROSTER (FILLABLE)</h3>
<p style="text-align: center; font-style: italic;">[T8 CCR §3220(b)(3)]</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1.5px solid #000;" border="1" cellpadding="6">
    <tr style="background-color: #f1f5f9; font-weight: bold;">
        <td style="width: 5%;">#</td>
        <td style="width: 25%;">Employee Name</td>
        <td style="width: 20%;">Job Title</td>
        <td style="width: 20%;">Crew/Location</td>
        <td style="width: 15%;">Present (✔/✖)</td>
        <td style="width: 15%;">Notes</td>
    </tr>
    \${Array.from({length: 10}, (_, i) => \`
    <tr>
        <td>\${i+1}</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>\`).join('')}
</table>
<div style="margin-top: 1.5rem; background-color: #f8fafc; border: 1px dashed var(--border-color); padding: 1rem; border-radius: 4px;">
    <strong>ACCOUNTABILITY PROCEDURE:</strong>
    <ol style="margin-top: 0.5rem; margin-bottom: 0;">
        <li>All employees report immediately to staging area.</li>
        <li>Supervisor conducts headcount using this daily crew roster.</li>
        <li>Missing employees reported immediately to the Emergency Coordinator and Emergency Responders.</li>
        <li>DO NOT leave the staging area until the person in charge dismisses you.</li>
    </ol>
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 2: EMERGENCY RESPONSE QUICK CHECKLIST (FIELD USE)</h3>
<table style="width: 100%; border-collapse: collapse; margin-top: 1.5rem; border: 1px solid var(--border-color);" border="1" cellpadding="8">
    <tr style="background-color: #f8fafc;">
        <th colspan="2" style="text-align: left; padding: 10px;">SUPERVISOR CHECKLIST</th>
    </tr>
    <tr>
        <td style="width: 10%; text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>What is the emergency?</strong> Identify fire, medical, fall, heat, or violent shooter.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Any injuries?</strong> How many? Are they conscious/breathing?</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>9-1-1 called?</strong> Call immediately for all active threats or medical emergencies.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Location clearly given?</strong> State the exact residential address of the job site.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Area secured?</strong> Isolate hazards if safe to prevent additional injuries.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Employees evacuated?</strong> Direct workers to the staging area.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Headcount completed?</strong> Roster accounting done by crew lead/supervisor.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Missing personnel identified?</strong> Note missing names and locations immediately.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Emergency Coordinator notified?</strong> Notify {{safety_officer}} at {{client_phone}}.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Responders guided to scene?</strong> Assign worker to meet police/fire at the main street.</td>
    </tr>
    <tr style="background-color: #f8fafc;">
        <th colspan="2" style="text-align: left; padding: 10px;">UTILITIES CONTROL (IF SAFE)</th>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Gas shut off:</strong> Main gas lines or water heater gas valve closed if leak suspected.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Electrical shut off:</strong> Turn off main breaker panels or structural power circuits.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Water shut off:</strong> Close main water shut-off valves if lines are damaged.</td>
    </tr>
</table>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 3: EMERGENCY FLOWCHART POSTER (FIELD VERSION)</h3>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-top: 1.5rem; text-align: center; font-family: sans-serif;">
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">1. IDENTIFY EMERGENCY</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">2. STOP WORK</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">3. ALERT OTHERS ("EMERGENCY")</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #ef4444; color: #ef4444; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #fef2f2; border-radius: 6px; width: 80%;">4. CALL 9-1-1</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">5. EVACUATE / TAKE COVER</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">6. GO TO STAGING AREA</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">7. HEADCOUNT</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">8. WAIT FOR INSTRUCTIONS</div>
</div>
<div style="margin-top: 1.5rem; border: 1.5px solid #ef4444; padding: 0.75rem; background-color: #fef2f2; border-radius: 4px;">
    <strong>SPECIAL CONDITIONS:</strong>
    <ul style="margin-top: 0.25rem; margin-bottom: 0;">
        <li><strong>FIRE</strong> &rarr; Evacuate immediately</li>
        <li><strong>INJURY</strong> &rarr; Do not move victim</li>
        <li><strong>SHOOTER</strong> &rarr; Run / Hide / Fight</li>
        <li><strong>HEAT</strong> &rarr; Cool immediately</li>
    </ul>
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 4: TAILGATE TRAINING HANDOUT (WEATHERIZATION CREWS)</h3>
<p style="text-align: center; font-style: italic;">EMERGENCY ACTION PLAN – FIELD TRAINING</p>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
    <div style="border: 1px solid var(--border-color); padding: 0.75rem; border-radius: 4px;">
        <strong>✔ COMMON HAZARDS:</strong>
        <ul style="margin-top: 0.25rem; margin-bottom: 0;">
            <li>Heat exposure</li>
            <li>Ladder falls</li>
            <li>Roof work</li>
            <li>Gas/water heaters</li>
            <li>Lead exposure</li>
        </ul>
    </div>
    <div style="border: 1px solid var(--border-color); padding: 0.75rem; border-radius: 4px;">
        <strong>✔ GENERAL RULES:</strong>
        <ul style="margin-top: 0.25rem; margin-bottom: 0;">
            <li>STOP WORK</li>
            <li>STAY CALM</li>
            <li>CALL 9-1-1</li>
            <li>EVACUATE</li>
        </ul>
    </div>
</div>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;" border="1" cellpadding="8">
    <tr style="background-color: #f8fafc; font-weight: bold;">
        <td style="width: 25%;">Scenario</td>
        <td>Emergency Actions Required</td>
    </tr>
    <tr>
        <td><strong>FIRE</strong></td>
        <td>Get out immediately. Do not use elevator. Stay low.</td>
    </tr>
    <tr>
        <td><strong>HEAT ILLNESS</strong></td>
        <td>Move to shade. Drink water. Call 911 if confused.</td>
    </tr>
    <tr>
        <td><strong>FALL</strong></td>
        <td>Do not move injured. Call 911.</td>
    </tr>
    <tr>
        <td><strong>ACTIVE SHOOTER</strong></td>
        <td>RUN, HIDE, FIGHT (last resort).</td>
    </tr>
</table>
<div style="margin-top: 1.5rem; background-color: #f8fafc; border: 1.5px solid var(--border-color); padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
    <strong>IMPORTANT REMINDER:</strong><br>
    Know your job site address &bull; Know your supervisor &bull; Know exit paths
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 5: INCIDENT REPORT FORM</h3>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color);" border="1" cellpadding="6">
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; width: 15%;">Date:</td>
        <td style="width: 35%;">________________</td>
        <td style="background-color: #f8fafc; font-weight: bold; width: 15%;">Time:</td>
        <td style="width: 35%;">________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Location:</td>
        <td colspan="3">____________________________________________________________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Type of Emergency:</td>
        <td colspan="3">____________________________________________________________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Description:</td>
        <td colspan="3" style="height: 40px;">____________________________________________________________________</td>
    </tr>
    <tr style="background-color: #f8fafc; font-weight: bold;">
        <td colspan="4">INJURY CLASSIFICATION CHECKS</td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] FATALITY</strong><br>
            [ ] Death confirmed &bull; [ ] CPR performed<br>
            Time pronounced: __________
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] HEAT-RELATED ILLNESSES</strong><br>
            [ ] Heat cramps &bull; [ ] Heat exhaustion &bull; [ ] Heat stroke<br>
            Symptoms: [ ] Dizziness [ ] Confusion [ ] Nausea/vomiting [ ] Loss of consciousness
        </td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] CUTS / LACERATIONS / BLEEDING</strong><br>
            [ ] Minor cut (first aid only)<br>
            [ ] Moderate bleeding (bandaging required)<br>
            [ ] Severe bleeding (uncontrolled / life-threatening)
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] FALLS / TRAUMA (LADDERS / ROOFS)</strong><br>
            [ ] Fall from ladder &bull; [ ] Fall from roof &bull; [ ] Slip / trip / fall (same level)<br>
            Suspected: [ ] Head injury &bull; [ ] Spinal injury
        </td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] FRACTURES / MUSCULOSKELETAL INJURIES</strong><br>
            [ ] Suspected fracture &bull; [ ] Dislocation &bull; [ ] Sprain / strain &bull; [ ] Back injury
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] BURNS</strong><br>
            Type: [ ] Thermal (heat/fire) &bull; [ ] Chemical &bull; [ ] Electrical<br>
            Severity: [ ] Minor &bull; [ ] Moderate &bull; [ ] Severe
        </td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] ELECTRICAL SHOCK</strong><br>
            [ ] Contact with live source &bull; [ ] Loss of consciousness<br>
            [ ] Entry/exit wounds observed
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] CHEMICAL / HAZARDOUS EXPOSURE</strong><br>
            [ ] Lead exposure suspected &bull; [ ] Inhalation exposure<br>
            [ ] Skin contact &bull; [ ] Eye exposure
        </td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] RESPIRATORY DISTRESS</strong><br>
            [ ] Difficulty breathing &bull; [ ] Smoke inhalation<br>
            [ ] Dust/insulation exposure
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] GAS / CARBON MONOXIDE EXPOSURE</strong><br>
            [ ] Suspected gas leak exposure<br>
            CO symptoms: [ ] Headache [ ] Dizziness [ ] Confusion
        </td>
    </tr>
    <tr>
        <td colspan="4" style="vertical-align: top;">
            <strong>[ ] VIOLENCE-RELATED INJURIES</strong><br>
            [ ] Assault injury &bull; [ ] Gunshot wound &bull; [ ] Blunt force trauma &bull; [ ] Other: ____________________
        </td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">INJURY DESCRIPTION (REQUIRED)</td>
        <td colspan="3" style="height: 60px; vertical-align: top; color: var(--text-muted);">
            Describe nature of injury, body part affected, severity, and first aid provided:<br><br>
        </td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">MEDICAL RESPONSE</td>
        <td colspan="3">
            [ ] First Aid Provided &bull; [ ] CPR/AED Used &bull; [ ] 9-1-1 Called &bull; [ ] Transported to Hospital &bull; [ ] Refused Treatment
        </td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">PERSON PROVIDING CARE</td>
        <td>__________________________</td>
        <td style="background-color: #f8fafc; font-weight: bold;">Certification (if any):</td>
        <td>__________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actions Taken:</td>
        <td colspan="3" style="height: 30px;">____________________________________________________________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Reported By:</td>
        <td>Name: ______________________</td>
        <td style="background-color: #f8fafc; font-weight: bold;">Signature / Date:</td>
        <td>______________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Witness 1:</td>
        <td>
            Name: ____________________<br>
            Phone: ____________________<br>
            Email: ____________________
        </td>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Witness 1 Statement:</td>
        <td style="height: 40px; vertical-align: top; color: var(--text-muted);">Statement:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Witness 2:</td>
        <td>
            Name: ____________________<br>
            Phone: ____________________<br>
            Email: ____________________
        </td>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Witness 2 Statement:</td>
        <td style="height: 40px; vertical-align: top; color: var(--text-muted);">Statement:</td>
    </tr>
</table>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 6: EMERGENCY CONTACT POSTER</h3>
<div style="border: 4px double #000; padding: 1.5rem; text-align: center; margin-top: 1.5rem;">
    <h2 style="color: #ef4444; font-size: 2.25rem; margin-top: 0; margin-bottom: 1rem;">EMERGENCY CONTACTS</h2>
    <table style="width: 100%; border-collapse: collapse; text-align: left;" border="1" cellpadding="8">
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold; width: 40%;">Emergency Response Line</td>
            <td><strong style="color: #ef4444; font-size: 1.25rem;">9-1-1</strong> (Ambulance, Fire, Police)</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">{{client_name}} Program Office</td>
            <td>{{client_phone}}</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">Emergency Coordinator ({{safety_officer}})</td>
            <td>{{safety_officer_phone}}</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">Brawley Fire Department (Non-Emergency)</td>
            <td>{{fire_dept_non_emergency_phone}}</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">California Governor's Office of Emergency Services</td>
            <td>(916) 845-8510</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">Department of Toxic Substances Control (DTSC El Centro)</td>
            <td>{{dtsc_phone}} (Statewide Line, routes locally)</td>
        </tr>
    </table>
    <div style="margin-top: 1.5rem; border: 2px solid #000; padding: 1rem; background-color: #f8fafc; text-align: left;">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; color: #ef4444;">NEAREST HOSPITAL:</h4>
        <strong>{{hospital_name}}</strong><br>
        {{hospital_address}}<br>
        Phone: {{hospital_phone}}
    </div>
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 7: MANAGEMENT CHECKLIST</h3>
<p style="text-align: center; font-style: italic;">EMERGENCY COORDINATOR CHECKLIST</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1.5rem; border: 1px solid var(--border-color);" border="1" cellpadding="8">
    <tr style="background-color: #f8fafc;">
        <th style="width: 10%; text-align: center;">Done</th>
        <th style="text-align: left;">Coordinator Action Items</th>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Establish command</strong> &bull; Take control of communication and scene response.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Contact emergency services</strong> &bull; Confirm 9-1-1 has been called.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Verify evacuation</strong> &bull; Confirm all office and field personnel are clear.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Ensure headcount complete</strong> &bull; Check accountability rosters for all crews.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Coordinate responders</strong> &bull; Send designated person to meet responders on road.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Determine re-entry or shutdown</strong> &bull; Authorize re-entry only when cleared by officials.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Document incident</strong> &bull; File official incident reports.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Conduct post-incident review</strong> &bull; Review EAP response effectiveness.</td>
    </tr>
</table>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 8: TRAINING SIGN-IN SHEET</h3>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color);" border="1" cellpadding="6">
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; width: 20%;">Company:</td>
        <td style="width: 30%;">{{client_name}}</td>
        <td style="background-color: #f8fafc; font-weight: bold; width: 20%;">Program:</td>
        <td style="width: 30%;">{{eap_program_name}}</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Location:</td>
        <td>{{client_address}}</td>
        <td style="background-color: #f8fafc; font-weight: bold;">Instructor:</td>
        <td>{{safety_officer}}</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Crew Leader:</td>
        <td colspan="3">_______________________________________</td>
    </tr>
</table>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1.5px solid #000;" border="1" cellpadding="6">
    <tr style="background-color: #f1f5f9; font-weight: bold;">
        <td style="width: 5%;">#</td>
        <td style="width: 30%;">Employee Name</td>
        <td style="width: 30%;">Signature</td>
        <td style="width: 15%;">Date</td>
        <td style="width: 20%;">Crew</td>
    </tr>
    \${Array.from({length: 10}, (_, i) => \`
    <tr>
        <td>\${i+1}</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>\`).join('')}
</table>
<div style="margin-top: 1rem; border: 1px solid var(--border-color); padding: 0.75rem; background-color: #f8fafc;">
    <strong>TRAINING CERTIFICATION STATEMENT:</strong><br>
    <p style="font-style: italic; margin-top: 0.25rem; margin-bottom: 0; font-size: 0.85rem;">
        “By placing my signature in this Safety Sign-in Sheet, I am verifying that I have received training on the Emergency Action Plan and understand my responsibilities. I have had the opportunity to ask questions, and I have received clear and specific answers to my satisfaction.”
    </p>
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENT 9: POST-INCIDENT REVIEW FORM</h3>
<p style="text-align: center; font-style: italic;">POST-EMERGENCY EVALUATION</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color);" border="1" cellpadding="8">
    <tr>
        <td style="width: 30%; background-color: #f8fafc; font-weight: bold; vertical-align: top;">What happened?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">Describe what occurred:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">What worked well?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">List successful aspects:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">What failed?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">Describe breakdowns/delays:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Injuries?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">List injured personnel and severity:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Improvements needed?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">Identify required EAP updates:</td>
    </tr>
</table>
<div style="margin-top: 1.5rem; background-color: #f8fafc; border: 1.5px solid var(--border-color); padding: 1rem; border-radius: var(--radius-sm);">
    <strong>COMPLIANCE CONFIRMATION:</strong><br>
    This plan packet fully aligns with: <strong>CCR Title 8 Section 3220</strong><br>
    ✔ Evacuation procedures &bull; ✔ Critical operations &bull; ✔ Accountability &bull; ✔ Rescue duties &bull; ✔ Reporting methods &bull; ✔ Responsible persons &bull; ✔ Alarm system &bull; ✔ Training
</div>
<table style="width: 100%; margin-top: 1.5rem;" cellpadding="6">
    <tr>
        <td><strong>Coordinator Signature:</strong><br><br>___________________________</td>
        <td><strong>Date of Review:</strong><br><br>___________________________</td>
    </tr>
</table>`,
                content_template_es: `<div class="print-page-break"></div>
<h2>Apéndices de EAP y Hojas de Trabajo de Campo</h2>
<p>Las siguientes páginas contienen registros, listas de verificación, diagramas de flujo y hojas de asistencia para cumplir con los requisitos de Cal/OSHA y ayudar a los equipos de campo.</p>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 1: LISTA DE CONTROL DE PERSONAL (LLENABLE)</h3>
<p style="text-align: center; font-style: italic;">[T8 CCR §3220(b)(3)]</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1.5px solid #000;" border="1" cellpadding="6">
    <tr style="background-color: #f1f5f9; font-weight: bold;">
        <td style="width: 5%;">#</td>
        <td style="width: 25%;">Nombre del Empleado</td>
        <td style="width: 20%;">Puesto de Trabajo</td>
        <td style="width: 20%;">Equipo / Ubicación</td>
        <td style="width: 15%;">Presente (✔/✖)</td>
        <td style="width: 15%;">Notas</td>
    </tr>
    \${Array.from({length: 10}, (_, i) => \`
    <tr>
        <td>\${i+1}</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>\`).join('')}
</table>
<div style="margin-top: 1.5rem; background-color: #f8fafc; border: 1px dashed var(--border-color); padding: 1rem; border-radius: 4px;">
    <strong>PROCEDIMIENTO DE CONTABILIZACIÓN:</strong>
    <ol style="margin-top: 0.5rem; margin-bottom: 0;">
        <li>Todos los empleados se reportan de inmediato al área de reunión designada.</li>
        <li>El supervisor realiza el recuento de personal utilizando esta lista diaria.</li>
        <li>Los empleados desaparecidos se reportan de inmediato al Coordinador de Emergencia y Rescatistas.</li>
        <li>NO abandone el área de reunión hasta que el supervisor a cargo lo autorice.</li>
    </ol>
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 2: LISTA DE VERIFICACIÓN DE RESPUESTA A EMERGENCIAS (USO EN CAMPO)</h3>
<table style="width: 100%; border-collapse: collapse; margin-top: 1.5rem; border: 1px solid var(--border-color);" border="1" cellpadding="8">
    <tr style="background-color: #f8fafc;">
        <th colspan="2" style="text-align: left; padding: 10px;">LISTA DE VERIFICACIÓN DEL SUPERVISOR</th>
    </tr>
    <tr>
        <td style="width: 10%; text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Cuál es la emergencia?</strong> Identifique incendio, emergencia médica, caída, calor o atacante.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Hay lesionados?</strong> ¿Cuántos? ¿Están conscientes/respiran?</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Llamó al 9-1-1?</strong> Llame inmediatamente ante cualquier peligro vital.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Dio la ubicación exacta?</strong> Dé la dirección exacta del sitio residencial de trabajo.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Aseguró el área?</strong> Aísle los peligros si es seguro para evitar más lesiones.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Evacuó al personal?</strong> Dirija a los trabajadores al área de reunión.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Hizo el recuento?</strong> Contabilización completada por supervisor o capataz.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Identificó desaparecidos?</strong> Anote nombres y áreas sospechosas de inmediato.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Notificó al coordinador?</strong> Informe a {{safety_officer}} al {{client_phone}}.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>¿Guió a los servicios de rescate?</strong> Asigne a alguien a esperar a los rescatistas en la calle principal.</td>
    </tr>
    <tr style="background-color: #f8fafc;">
        <th colspan="2" style="text-align: left; padding: 10px;">CONTROL DE SERVICIOS PÚBLICOS (SI ES SEGURO)</th>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Corte de gas:</strong> Válvulas del medidor o del calentador de agua cerradas ante fuga sospechada.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Corte de electricidad:</strong> Apague el interruptor principal o los circuitos eléctricos en el panel.</td>
    </tr>
    <tr>
        <td style="text-align: center; font-size: 1.25rem;">[ ]</td>
        <td><strong>Corte de agua:</strong> Cierre la válvula de paso principal si se sospecha una fuga grave o daño estructural.</td>
    </tr>
</table>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 3: DIAGRAMA DE FLUJO DE RESPUESTA A EMERGENCIAS (VERSIÓN DE CAMPO)</h3>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-top: 1.5rem; text-align: center; font-family: sans-serif;">
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">1. IDENTIFICAR LA EMERGENCIA</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">2. DETENER EL TRABAJO</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">3. ALERTAR A OTROS ("EMERGENCIA")</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #ef4444; color: #ef4444; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #fef2f2; border-radius: 6px; width: 80%;">4. LLAMAR AL 9-1-1</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">5. EVACUAR LA ESTRUCTURA / REFUGIARSE</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">6. PROCEDER AL ÁREA DE REUNIÓN</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">7. REALIZAR EL RECUENTO</div>
    <div style="font-size: 1.5rem; line-height: 1;">⬇</div>
    <div style="border: 2px solid #000; padding: 0.75rem 1.5rem; font-weight: bold; background-color: #f8fafc; border-radius: 6px; width: 80%;">8. ESPERAR INSTRUCCIONES</div>
</div>
<div style="margin-top: 1.5rem; border: 1.5px solid #ef4444; padding: 0.75rem; background-color: #fef2f2; border-radius: 4px;">
    <strong>CONDICIONES ESPECIALES:</strong>
    <ul style="margin-top: 0.25rem; margin-bottom: 0;">
        <li><strong>INCENDIO</strong> &rarr; Evacúe de inmediato</li>
        <li><strong>LESIONES</strong> &rarr; No mueva al lesionado</li>
        <li><strong>ATACANTE</strong> &rarr; Corra / Escóndase / Pelee</li>
        <li><strong>CALOR</strong> &rarr; Enfríe de inmediato</li>
    </ul>
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 4: FOLLETO DE CAPACITACIÓN EN CAMPO</h3>
<p style="text-align: center; font-style: italic;">PLAN DE ACCIÓN DE EMERGENCIA – CAPACITACIÓN DE CAMPO</p>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
    <div style="border: 1px solid var(--border-color); padding: 0.75rem; border-radius: 4px;">
        <strong>✔ PELIGROS COMUNES:</strong>
        <ul style="margin-top: 0.25rem; margin-bottom: 0;">
            <li>Exposición al calor</li>
            <li>Caídas de escaleras</li>
            <li>Trabajo en techos</li>
            <li>Calentadores de gas/agua</li>
            <li>Exposición a plomo</li>
        </ul>
    </div>
    <div style="border: 1px solid var(--border-color); padding: 0.75rem; border-radius: 4px;">
        <strong>✔ REGLAS GENERALES:</strong>
        <ul style="margin-top: 0.25rem; margin-bottom: 0;">
            <li>DETENGA TRABAJO</li>
            <li>MANTENGA CALMA</li>
            <li>LLAME AL 9-1-1</li>
            <li>EVACÚE</li>
        </ul>
    </div>
</div>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;" border="1" cellpadding="8">
    <tr style="background-color: #f8fafc; font-weight: bold;">
        <td style="width: 25%;">Escenario</td>
        <td>Acciones de Emergencia Requeridas</td>
    </tr>
    <tr>
        <td><strong>INCENDIO</strong></td>
        <td>Salga inmediatamente. No use elevador. Manténgase bajo.</td>
    </tr>
    <tr>
        <td><strong>ENFERMEDAD POR CALOR</strong></td>
        <td>Vaya a la sombra. Beba agua. Llame al 911 si está confundido.</td>
    </tr>
    <tr>
        <td><strong>CAÍDA</strong></td>
        <td>No mueva al lesionado. Llame al 911.</td>
    </tr>
    <tr>
        <td><strong>ATACANTE ACTIVO</strong></td>
        <td>CORRER, ESCONDERSE, PELEAR (último recurso).</td>
    </tr>
</table>
<div style="margin-top: 1.5rem; background-color: #f8fafc; border: 1.5px solid var(--border-color); padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
    <strong>RECORDATORIO IMPORTANTE:</strong><br>
    Conozca la dirección exacta del sitio de trabajo &bull; Conozca a su supervisor &bull; Conozca las salidas
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 5: FORMULARIO DE REPORTE DE INCIDENTES</h3>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color);" border="1" cellpadding="6">
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; width: 15%;">Fecha:</td>
        <td style="width: 35%;">________________</td>
        <td style="background-color: #f8fafc; font-weight: bold; width: 15%;">Hora:</td>
        <td style="width: 35%;">________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Ubicación:</td>
        <td colspan="3">____________________________________________________________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Tipo de Emergencia:</td>
        <td colspan="3">____________________________________________________________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Descripción:</td>
        <td colspan="3" style="height: 40px;">____________________________________________________________________</td>
    </tr>
    <tr style="background-color: #f8fafc; font-weight: bold;">
        <td colspan="4">SELECCIÓN DE CLASIFICACIÓN DE LESIONES</td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] FATALIDAD</strong><br>
            [ ] Muerte confirmada &bull; [ ] RCP realizado<br>
            Hora de confirmación: __________
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] ENFERMEDADES POR CALOR</strong><br>
            [ ] Calambres &bull; [ ] Agotamiento &bull; [ ] Golpe de calor<br>
            Síntomas: [ ] Mareo [ ] Confusión [ ] Náuseas/vómitos [ ] Pérdida del conocimiento
        </td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] CORTES / LACERACIONES / SANGRADO</strong><br>
            [ ] Corte menor (solo primeros auxilios)<br>
            [ ] Sangrado moderado (requiere vendaje)<br>
            [ ] Sangrado grave (incontrolado / peligro de vida)
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] CAÍDAS / TRAUMA (ESCALERAS / TECHOS)</strong><br>
            [ ] Caída de escalera &bull; [ ] Caída de techo &bull; [ ] Resbalón / tropiezo / caída (mismo nivel)<br>
            Sospecha de: [ ] Lesión en cabeza &bull; [ ] Lesión espinal
        </td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] FRACTURAS / LESIONES MUSCULOESQUELÉTICAS</strong><br>
            [ ] Sospecha de fractura &bull; [ ] Dislocación &bull; [ ] Esguince / tirón &bull; [ ] Lesión de espalda
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] QUEMADURAS</strong><br>
            Type: [ ] Térmica (fuego/calor) &bull; [ ] Química &bull; [ ] Eléctrica<br>
            Gravedad: [ ] Menor &bull; [ ] Moderada &bull; [ ] Severe
        </td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] CHOQUE ELÉCTRICO</strong><br>
            [ ] Contacto con fuente viva &bull; [ ] Pérdida de conciencia<br>
            [ ] Heridas de entrada/salida observadas
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] EXPOSICIÓN QUÍMICA / HAZARDOUS</strong><br>
            [ ] Exposición a plomo sospechada &bull; [ ] Inhalación de contaminante<br>
            [ ] Contacto con la piel &bull; [ ] Exposición ocular
        </td>
    </tr>
    <tr>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] DIFICULTAD RESPIRATORIA</strong><br>
            [ ] Dificultad para respirar &bull; [ ] Inhalación de humo<br>
            [ ] Polvo/exposición a fibra de vidrio
        </td>
        <td colspan="2" style="vertical-align: top;">
            <strong>[ ] EXPOSICIÓN A GAS / MONÓXIDO DE CARBONO</strong><br>
            [ ] Sospecha de fuga de gas de calentador<br>
            Síntomas CO: [ ] Dolor de cabeza [ ] Mareo [ ] Confusión
        </td>
    </tr>
    <tr>
        <td colspan="4" style="vertical-align: top;">
            <strong>[ ] LESIONES RELACIONADAS CON VIOLENCIA</strong><br>
            [ ] Lesión por agresión &bull; [ ] Herida de bala &bull; [ ] Trauma por fuerza contundente &bull; [ ] Otro: ____________________
        </td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">DESCRIPCIÓN DE LA LESIÓN (REQUERIDO)</td>
        <td colspan="3" style="height: 60px; vertical-align: top; color: var(--text-muted);">
            Describa naturaleza de la lesión, parte afectada, gravedad y primeros auxilios dados:<br><br>
        </td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">RESPUESTA MÉDICA</td>
        <td colspan="3">
            [ ] Primeros auxilios dados &bull; [ ] Uso de RCP/DEA &bull; [ ] Llamada al 9-1-1 &bull; [ ] Traslado al hospital &bull; [ ] Rechazó tratamiento
        </td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">PERSONA QUE DIO ATENCIÓN</td>
        <td>__________________________</td>
        <td style="background-color: #f8fafc; font-weight: bold;">Certificaciones (si aplica):</td>
        <td>__________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Acciones Tomadas:</td>
        <td colspan="3" style="height: 30px;">____________________________________________________________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Reported By:</td>
        <td>Nombre: ______________________</td>
        <td style="background-color: #f8fafc; font-weight: bold;">Firma / Fecha:</td>
        <td>______________________</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Testigo 1:</td>
        <td>
            Nombre: ____________________<br>
            Teléfono: ____________________<br>
            Email: ____________________
        </td>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Testigo 1 Declaración:</td>
        <td style="height: 40px; vertical-align: top; color: var(--text-muted);">Declaración:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Testigo 2:</td>
        <td>
            Name: ____________________<br>
            Phone: ____________________<br>
            Email: ____________________
        </td>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Testigo 2 Declaración:</td>
        <td style="height: 40px; vertical-align: top; color: var(--text-muted);">Declaración:</td>
    </tr>
</table>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 6: POSTER DE CONTACTOS DE EMERGENCIA</h3>
<div style="border: 4px double #000; padding: 1.5rem; text-align: center; margin-top: 1.5rem;">
    <h2 style="color: #ef4444; font-size: 2.25rem; margin-top: 0; margin-bottom: 1rem;">CONTACTOS DE EMERGENCIA</h2>
    <table style="width: 100%; border-collapse: collapse; text-align: left;" border="1" cellpadding="8">
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold; width: 40%;">Línea de Emergencia</td>
            <td><strong style="color: #ef4444; font-size: 1.25rem;">9-1-1</strong> (Ambulancia, Bomberos, Policía)</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">Oficina del Programa {{client_name}}</td>
            <td>{{client_phone}}</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">Coordinador de Emergencia ({{safety_officer}})</td>
            <td>{{safety_officer_phone}}</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">Departamento de Bomberos (Brawley)</td>
            <td>{{fire_dept_non_emergency_phone}}</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">Oficina de Servicios de Emergencia (Cal OES)</td>
            <td>(916) 845-8510</td>
        </tr>
        <tr>
            <td style="background-color: #f8fafc; font-weight: bold;">Control de Sustancias Tóxicas (DTSC El Centro)</td>
            <td>{{dtsc_phone}} (Estatal, redirige a local)</td>
        </tr>
    </table>
    <div style="margin-top: 1.5rem; border: 2px solid #000; padding: 1rem; background-color: #f8fafc; text-align: left;">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; color: #ef4444;">HOSPITAL MÁS CERCANO:</h4>
        <strong>{{hospital_name}}</strong><br>
        {{hospital_address}}<br>
        Teléfono: {{hospital_phone}}
    </div>
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 7: LISTA DE VERIFICACIÓN GERENCIAL</h3>
<p style="text-align: center; font-style: italic;">LISTA DEL COORDINADOR DE EMERGENCIAS</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1.5rem; border: 1px solid var(--border-color);" border="1" cellpadding="8">
    <tr style="background-color: #f8fafc;">
        <th style="width: 10%; text-align: center;">Done</th>
        <th style="text-align: left;">Acciones del Coordinador</th>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Establecer el mando</strong> &bull; Tomar control de comunicaciones y operaciones de escena.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Notificar servicios de rescate</strong> &bull; Confirmar llamada al 9-1-1.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Verificar evacuación</strong> &bull; Confirmar salida de oficina y campos.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Asegurar recuento completado</strong> &bull; Verificar listas de control de personal.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Coordinar llegada de socorristas</strong> &bull; Asignar persona a recibirlos en calle.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Determinar reingreso</strong> &bull; Autorizar reingreso solo con confirmación de bomberos/policía.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Documentar incidente</strong> &bull; Llenar formularios oficiales de incidentes.</td>
    </tr>
    <tr>
        <td style="text-align: center;">[ ]</td>
        <td><strong>Revisión post-incidente</strong> &bull; Evaluar efectividad de EAP.</td>
    </tr>
</table>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 8: LISTA DE ASISTENCIA A CAPACITACIÓN</h3>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color);" border="1" cellpadding="6">
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; width: 20%;">Empresa:</td>
        <td style="width: 30%;">{{client_name}}</td>
        <td style="background-color: #f8fafc; font-weight: bold; width: 20%;">Programa:</td>
        <td style="width: 30%;">{{eap_program_name}}</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Ubicación:</td>
        <td>{{client_address}}</td>
        <td style="background-color: #f8fafc; font-weight: bold;">Instructor:</td>
        <td>{{safety_officer}}</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold;">Líder de Equipo:</td>
        <td colspan="3">_______________________________________</td>
    </tr>
</table>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1.5px solid #000;" border="1" cellpadding="6">
    <tr style="background-color: #f1f5f9; font-weight: bold;">
        <td style="width: 5%;">#</td>
        <td style="width: 30%;">Nombre del Empleado</td>
        <td style="width: 30%;">Firma</td>
        <td style="width: 15%;">Fecha</td>
        <td style="width: 20%;">Cuadrilla</td>
    </tr>
    \${Array.from({length: 10}, (_, i) => \`
    <tr>
        <td>\${i+1}</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>\`).join('')}
</table>
<div style="margin-top: 1rem; border: 1px solid var(--border-color); padding: 0.75rem; background-color: #f8fafc;">
    <strong>DECLARACIÓN DE CERTIFICACIÓN DE CAPACITACIÓN:</strong><br>
    <p style="font-style: italic; margin-top: 0.25rem; margin-bottom: 0; font-size: 0.85rem;">
        “Al colocar mi firma en esta hoja de firmas de seguridad, verifico que he recibido capacitación sobre el Plan de Acción de Emergencia y entiendo mis responsabilidades. He tenido la oportunidad de hacer preguntas y he recibido respuestas claras y específicas a mi entera satisfacción.”
    </p>
</div>

<div class="print-page-break"></div>
<h3 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">DOCUMENTO 9: FORMULARIO DE REVISIÓN POST-INCIDENTE</h3>
<p style="text-align: center; font-style: italic;">EVALUACIÓN POST-EMERGENCIA</p>
<table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid var(--border-color);" border="1" cellpadding="8">
    <tr>
        <td style="width: 30%; background-color: #f8fafc; font-weight: bold; vertical-align: top;">¿Qué sucedió?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">Describa lo ocurrido:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">¿Qué funcionó bien?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">Listee aspectos exitosos:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">¿Qué falló?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">Describa demoras o fallas de comunicación:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">¿Lesiones?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">Detalle lesionados y gravedad:</td>
    </tr>
    <tr>
        <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">¿Mejoras necesarias?</td>
        <td style="height: 60px; vertical-align: top; color: var(--text-muted);">Identifique actualizaciones requeridas al plan:</td>
    </tr>
</table>
<div style="margin-top: 1.5rem; background-color: #f8fafc; border: 1.5px solid var(--border-color); padding: 1rem; border-radius: var(--radius-sm);">
    <strong>CONFIRMACIÓN DE CUMPLIMIENTO:</strong><br>
    Este paquete del plan se alinea completamente con: <strong>CCR Título 8 Sección 3220</strong><br>
    ✔ Evacuación de personal &bull; ✔ Operaciones críticas &bull; ✔ Contabilización &bull; ✔ Deberes de rescate &bull; ✔ Métodos de reporte &bull; ✔ Personas responsables &bull; ✔ Sistema de alarma &bull; ✔ Capacitación
</div>
<table style="width: 100%; margin-top: 1.5rem;" cellpadding="6">
    <tr>
        <td><strong>Firma del Coordinador:</strong><br><br>___________________________</td>
        <td><strong>Fecha de Revisión:</strong><br><br>___________________________</td>
    </tr>
</table>`
            }
        ]
    },,
    {
        id: "php",
        name: "Pesticide Handler Program",
        abbreviation: "PHP",
        content_template: `<h1>Pesticide Handler Safety Program (PHP)</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Effective Date:</strong> {{effective_date}}</p>
<p><strong>Pesticide Coordinator:</strong> {{safety_officer}}</p>
<p>This Pesticide Handler Program addresses regulatory standards for the safe use, mixing, loading, and application of pesticides at {{client_name}}'s agricultural operations. All pesticide handler operations are overseen by {{safety_officer}} to ensure compliance with the California Department of Pesticide Regulation (DPR).</p>`,
        content_template_es: `<h1>Programa de Seguridad para Manejadores de Pesticidas (PHP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<p><strong>Coordinador de Pesticidas:</strong> {{safety_officer}}</p>
<p>Este Programa para Manejadores de Pesticidas aborda las normas regulatorias para el uso, mezcla, carga y aplicación segura de pesticidas en las operaciones agrícolas de {{client_name}}. Todas las operaciones de manejo de pesticidas son supervisadas por {{safety_officer}} para garantizar el cumplimiento con el Departamento de Regulación de Pesticidas de California (DPR).</p>`,
        subsections: [
            {
                id: "php_training_admin",
                title: "Training Timing, Qualifications & Recordkeeping / Capacitación y Registro",
                content_template: `<h2>Section 1 - Training Timing, Qualifications & Recordkeeping</h2>
<p><strong>1.1 - Scope and Frequency:</strong> All employees of {{client_name}} who handle pesticides must receive comprehensive pesticide safety training prior to performing any handling activities and at least annually thereafter, in accordance with 3 CCR §6724(a) and §6724(d). The training covered under this specific program was conducted on <strong>{{pesticide_training_date}}</strong>.</p>
<p><strong>1.2 - Trainer Qualifications:</strong> Training is conducted by a qualified trainer meeting the requirements of 3 CCR §6724(c) and §6724(e) (such as a licensed agricultural pest control adviser, certified applicator, or county extension agent).</p>
<p><strong>1.3 - Language and Comprehension:</strong> All safety training is conducted in a language and manner that employees understand. The trainer will verify employee comprehension through active discussion, question-and-answer sessions, and employee feedback in accordance with 3 CCR §6724(d).</p>
<p><strong>1.4 - Recordkeeping:</strong> Detailed training records—including employee name, training date, trainer name, and topics covered—are maintained for a minimum of two (2) years in accordance with 3 CCR §6724(e) and longer when necessary to support occupational safety, environmental compliance, or legal requirements.</p>`,
                content_template_es: `<h2>Sección 1 - Tiempos de Capacitación, Calificaciones y Registro</h2>
<p><strong>1.1 - Alcance y Frecuencia:</strong> Todos los empleados de {{client_name}} que manejan pesticidas deben recibir capacitación integral sobre seguridad en el uso de pesticidas antes de realizar cualquier actividad de manejo y al menos una vez al año a partir de entonces, de acuerdo con las normas 3 CCR §6724(a) y §6724(d). La capacitación cubierta por este programa específico se llevó a cabo el <strong>{{pesticide_training_date}}</strong>.</p>
<p><strong>1.2 - Calificaciones del Capacitador:</strong> La capacitación es impartida por un capacitador calificado que cumple con los requisitos de las normas 3 CCR §6724(c) y §6724(e) (como un asesor de control de plagas agrícolas con licencia, aplicador certificado o agente de extensión del condado).</p>
<p><strong>1.3 - Idioma y Comprensión:</strong> Toda la capacitación de seguridad se imparte en un idioma y de una manera que los empleados comprendan. El capacitador verificará la comprensión de los empleados a través de discusiones activas, sesiones de preguntas y respuestas, y comentarios de los empleados, de acuerdo con la norma 3 CCR §6724(d).</p>
<p><strong>1.4 - Registro de Archivos:</strong> Los registros detallados de la capacitación, que incluyen el nombre del empleado, la fecha de capacitación, el nombre del capacitador y los temas cubiertos, se mantienen durante un mínimo de dos (2) años de conformidad con la norma 3 CCR §6724(e), y más tiempo cuando sea necesario para respaldar la seguridad ocupacional, el cumplimiento ambiental o los requisitos legales.</p>`
            },
            {
                id: "php_labeling",
                title: "Pesticide Product Labeling & Precautionary Statements / Etiquetas de Pesticidas",
                content_template: `<h2>Section 2 - Pesticide Product Labeling & Precautionary Statements</h2>
<p><strong>2.1 - Format and Meaning:</strong> Employees must understand the format and meaning of information contained in pesticide product labeling, including precautionary statements about human health hazards, signal words (DANGER, WARNING, CAUTION), and environmental or physical hazards.</p>
<p><strong>2.2 - Sources of Information:</strong> The primary sources of information used to cover this topic include verbal instructions provided during annual training, Pesticide Safety Information Series (PSIS) A-1, page 1, information extracted directly from specific pesticide labels, and Safety Data Sheets (SDS).</p>`,
                content_template_es: `<h2>Sección 2 - Etiquetas de Productos Pesticidas y Advertencias</h2>
<p><strong>2.1 - Formato y Significado:</strong> Los empleados deben comprender el formato y el significado de la información contenida en las etiquetas de los productos pesticidas, incluidas las declaraciones de precaución sobre los peligros para la salud humana, las palabras de advertencia (PELIGRO, ADVERTENCIA, PRECAUCIÓN) y los peligros ambientales o físicos.</p>
<p><strong>2.2 - Fuentes de Información:</strong> Las fuentes primarias de información utilizadas para cubrir este tema incluyen instrucciones verbales proporcionadas durante la capacitación anual, la Serie de Información de Seguridad de Pesticidas (PSIS) A-1, página 1, información extraída directamente de las etiquetas de pesticidas específicos y las Hojas de Datos de Seguridad (SDS).</p>`
            },
            {
                id: "php_applicator_responsibility",
                title: "Applicator Responsibilities & Protection of Persons / Responsabilidades del Aplicador",
                content_template: `<h2>Section 3 - Applicator Responsibilities & Protection of Persons</h2>
<p><strong>3.1 - Protection of Persons, Animals, and Property:</strong> Applicators have a strict responsibility to protect persons, animals, and property while applying pesticides. Pesticides must never be applied in a manner that results in contact with persons not involved in the application process.</p>
<p><strong>3.2 - Sources of Information:</strong> Training content for this topic is extracted from Pesticide Safety Information Series (PSIS) A-1, A-6, and A-8, as well as Safety Data Sheets (SDS).</p>`,
                content_template_es: `<h2>Sección 3 - Responsabilidades del Aplicador y Protección de Personas</h2>
<p><strong>3.1 - Protección de Personas, Animales y Propiedades:</strong> Los aplicadores tienen la responsabilidad estricta de proteger a las personas, los animales y las propiedades mientras aplican pesticidas. Los pesticidas nunca deben aplicarse de una manera que resulte en contacto con personas que no participen en el proceso de aplicación.</p>
<p><strong>3.2 - Fuentes de Información:</strong> El contenido de la capacitación para este tema se extrae de la Serie de Información de Seguridad de Pesticidas (PSIS) A-1, A-6 y A-8, así como de las Hojas de Datos de Seguridad (SDS).</p>`
            },
            {
                id: "php_ppe_standards",
                title: "Personal Protective Equipment (PPE) Standards / Normas de PPE",
                content_template: `<h2>Section 4 - Personal Protective Equipment (PPE) Standards</h2>
<p><strong>4.1 - Appropriate Use and Limitations:</strong> Handlers must understand the need for, limitations, appropriate use, removal, and sanitation of any required Personal Protective Equipment (PPE).</p>
<p><strong>4.2 - Storage and Cleaning:</strong> Employees are verbally instructed about required safety equipment and its regular cleaning and maintenance. {{client_name}} provides a clean, pesticide-free area to store safety equipment when not in use. The designated PPE locker and storage area is located at <strong>{{pesticide_ppe_locker_location}}</strong>.</p>
<p><strong>4.3 - Sources of Information:</strong> Information regarding PPE is derived from Pesticide Safety Information Series (PSIS) A-1, A-5, and A-6, and instructions from pesticide labels.</p>`,
                content_template_es: `<h2>Sección 4 - Normas de Equipo de Protección Personal (PPE)</h2>
<p><strong>4.1 - Uso Adecuado y Limitaciones:</strong> Los manejadores deben comprender la necesidad, las limitaciones, el uso adecuado, el retiro y la desinfección de cualquier Equipo de Protección Personal (PPE) requerido.</p>
<p><strong>4.2 - Almacenamiento y Limpieza:</strong> Los empleados son instruidos verbalmente sobre el equipo de seguridad requerido y su limpieza y mantenimiento regular. {{client_name}} proporciona un área limpia y libre de pesticidas para almacenar el equipo de seguridad cuando no esté en uso. El casillero de PPE y el área de almacenamiento designada se encuentran en <strong>{{pesticide_ppe_locker_location}}</strong>.</p>
<p><strong>4.3 - Fuentes de Información:</strong> La información sobre el PPE se deriva de la Serie de Información de Seguridad de Pesticidas (PSIS) A-1, A-5 y A-6, e instrucciones de las etiquetas de los pesticidas.</p>`
            },
            {
                id: "php_safety_transport",
                title: "Safety Requirements, Transport & Engineering Controls / Requisitos de Seguridad y Transporte",
                content_template: `<h2>Section 5 - Safety Requirements, Transport, Storage & Engineering Controls</h2>
<p><strong>5.1 - Safe Procedures:</strong> Specific safety requirements and procedures are established for handling, transporting, storing, disposing of pesticides, and spill cleanups.</p>
<p><strong>5.2 - Engineering Controls:</strong> Handlers are instructed on the use of engineering controls (such as closed mixing systems and enclosed cabs) as appropriate for each material handled. Employees are verbally instructed on proper safety equipment and procedures for each material.</p>
<p><strong>5.3 - Sources of Information:</strong> Information is taken from Pesticide Safety Information Series (PSIS) A-3, specific pesticide labels, and Safety Data Sheets (SDS).</p>`,
                content_template_es: `<h2>Sección 5 - Requisitos de Seguridad, Transporte, Almacenamiento y Controles de Ingeniería</h2>
<p><strong>5.1 - Procedimientos Seguros:</strong> Se establecen requisitos y procedimientos de seguridad específicos para el manejo, transporte, almacenamiento, eliminación de pesticidas y limpieza de derrames.</p>
<p><strong>5.2 - Controles de Ingeniería:</strong> Se instruye a los manejadores sobre el uso de controles de ingeniería (como sistemas de mezcla cerrados y cabinas cerradas) según sea apropiado para cada material manejado. Los empleados reciben instrucciones verbales sobre el equipo y los procedimientos de seguridad adecuados para cada material.</p>
<p><strong>5.3 - Fuentes de Información:</strong> La información se toma de la Serie de Información de Seguridad de Pesticidas (PSIS) A-3, etiquetas específicas de pesticidas y Hojas de Datos de Seguridad (SDS).</p>`
            },
            {
                id: "php_hazards_residues",
                title: "Exposure Hazards, Residues & Environmental Concerns / Peligros Ambientales y Residuos",
                content_template: `<h2>Section 6 - Exposure Hazards, Residues & Environmental Concerns</h2>
<p><strong>6.1 - Exposure Sources:</strong> Handlers must understand where and in what forms pesticides may be encountered, including treated surfaces, residues on clothing, personal protective equipment, application equipment, and drift.</p>
<p><strong>6.2 - Health Hazards:</strong> Training covers acute, chronic, and delayed health effects, and sensitization effects, as identified in pesticide product labeling, SDS, or PSIS leaflets.</p>
<p><strong>6.3 - Environmental Protection:</strong> Employees are instructed not to apply pesticides in high winds or to areas where surface water is running off. Applicators must ensure pesticides are applied and kept inside intended target areas, protecting wildlife and preventing runoff or drift. (See Attachment B for detailed environmental concerns).</p>
<p><strong>6.4 - Sources of Information:</strong> Information is extracted from specific pesticide labels, SDS, Safety Series A-1, A-8, and Attachment B.</p>`,
                content_template_es: `<h2>Sección 6 - Peligros de Exposición, Residuos y Preocupaciones Ambientales</h2>
<p><strong>6.1 - Fuentes de Exposición:</strong> Los manejadores deben comprender dónde y en qué formas se pueden encontrar los pesticidas, incluidos los campos tratados, residuos en la ropa, equipo de protección personal, equipo de aplicación y la deriva.</p>
<p><strong>6.2 - Peligros para la Salud:</strong> La capacitación cubre los efectos agudos, crónicos y tardíos para la salud, así como los efectos de sensibilización, según se identifican en las etiquetas de los productos, SDS o folletos de PSIS.</p>
<p><strong>6.3 - Protección Ambiental:</strong> Se instruye a los empleados a no aplicar pesticidas cuando hay vientos fuertes o en áreas donde hay escorrentía de agua superficial. Los aplicadores deben asegurarse de que los pesticidas se apliquen y mantengan dentro de las áreas objetivo deseadas, protegiendo la vida silvestre y previniendo la escorrentía o la deriva. (Consulte el Anexo B para conocer los detalles ambientales).</p>
<p><strong>6.4 - Fuentes de Información:</strong> La información se extrae de etiquetas de pesticidas específicos, SDS, Serie de Seguridad A-1, A-8 y el Anexo B.</p>`
            },
            {
                id: "php_exposure_routes",
                title: "Routes of Exposure & Signs of Overexposure / Vías y Signos de Exposición",
                content_template: `<h2>Section 7 - Routes of Exposure & Signs of Overexposure</h2>
<p><strong>7.1 - Routes of Entry:</strong> Pesticides can enter the body through several routes: dermal (skin), ocular (eyes), inhalation (lungs), and ingestion (mouth). Dermal absorption is the most common route of occupational exposure.</p>
<p><strong>7.2 - Signs and Symptoms:</strong> Handlers must be trained to recognize the early signs and symptoms of overexposure, which may include headaches, dizziness, nausea, excessive sweating, muscle cramps, skin irritation, or difficulty breathing.</p>
<p><strong>7.3 - Sources of Information:</strong> This training topic uses information extracted from specific pesticide labels, Safety Data Sheets (SDS), and Safety Series A-4.</p>`,
                content_template_es: `<h2>Sección 7 - Vías de Exposición y Signos de Sobreexposición</h2>
<p><strong>7.1 - Vías de Entrada:</strong> Los pesticidas pueden ingresar al cuerpo a través de varias vías: dérmica (piel), ocular (ojos), inhalación (pulmones) e ingestión (boca). La absorción dérmica es la vía más común de exposición ocupacional.</p>
<p><strong>7.2 - Signos y Síntomas:</strong> Los manejadores deben estar capacitados para reconocer los signos y síntomas tempranos de la sobreexposición, que pueden incluir dolores de cabeza, mareos, náuseas, sudoración excesiva, calambres musculares, irritación de la piel o dificultad para respirar.</p>
<p><strong>7.3 - Fuentes de Información:</strong> Este tema de capacitación utiliza información extraída de las etiquetas específicas de pesticidas, Hojas de Datos de Seguridad (SDS) y la Serie de Seguridad A-4.</p>`
            },
            {
                id: "php_decon_procedures",
                title: "Decontamination Procedures / Procedimientos de Descontaminación",
                content_template: `<h2>Section 8 - Routine Decontamination Procedures</h2>
<p><strong>8.1 - Routine Hygiene:</strong> Employees must follow routine decontamination procedures immediately after handling pesticides or when any exposure occurs. Handlers are instructed to:</p>
<ul>
    <li>Wash hands thoroughly before eating, drinking, using the toilet, chewing gum, or using tobacco.</li>
    <li>Thoroughly wash or shower with soap and water at the end of the shift.</li>
    <li>Change into clean clothes as soon as possible after work.</li>
    <li>Wash work clothes separately from other laundry before wearing them again.</li>
</ul>
<p><strong>8.2 - Sources of Information:</strong> Safety Series A-4 is reviewed. Employees are trained to decontaminate immediately after handling pesticides and after any exposure occurs.</p>`,
                content_template_es: `<h2>Sección 8 - Procedimientos Rutinarios de Descontaminación</h2>
<p><strong>8.1 - Higiene Rutinaria:</strong> Los empleados deben seguir los procedimientos de descontaminación de rutina inmediatamente después de manejar pesticidas o cuando ocurra cualquier exposición. Se instruye a los manejadores a:</p>
<ul>
    <li>Lavarse las manos minuciosamente antes de comer, beber, usar el baño, masticar chicle o usar tabaco.</li>
    <li>Lavarse o ducharse minuciosamente con agua y jabón al final del turno.</li>
    <li>Cambiarse de ropa limpia lo antes posible después de terminar el trabajo.</li>
    <li>Lavar la ropa de trabajo por separado de otra ropa antes de volver a usarla.</li>
</ul>
<p><strong>8.2 - Fuentes de Información:</strong> Se revisa la Serie de Seguridad A-4. Los empleados están capacitados para descontaminarse inmediatamente después de manejar pesticidas y después de que ocurra cualquier exposición.</p>`
            },
            {
                id: "php_hazcom_sds",
                title: "Hazard Communication & Safety Data Sheets (SDS) / Acceso a SDS y HazCom",
                content_template: `<h2>Section 9 - Hazard Communication & Safety Data Sheets (SDS)</h2>
<p><strong>9.1 - Safety Data Sheets (SDS) Access:</strong> Safety Data Sheets provide critical hazard, emergency medical treatment, and chemical information. Sample SDS are provided during training, and employees are shown how to read and locate them. Application-specific information and SDS are kept available for all employees at: <strong>{{pesticide_sds_location}}</strong>.</p>
<p><strong>9.2 - Hazard Communication Rules:</strong> The employer complies with 3 CCR §6723 hazard communication requirements. Information from Safety Series A-8 is reviewed by all employees.</p>
<p><strong>9.3 - Regulatory Compliance:</strong> Safety requirements of Title 3, Division 6, Chapters 3 and 4 relating to pesticide safety, SDS, and Pesticide Safety Information Series (PSIS) leaflets are reviewed. Training covers information from specific pesticide labels, SDS, and Safety Series A-1 through A-8, and A-10.</p>`,
                content_template_es: `<h2>Sección 9 - Comunicación de Peligros y Hojas de Datos de Seguridad (SDS)</h2>
<p><strong>9.1 - Acceso a las Hojas de Datos de Seguridad (SDS):</strong> Las Hojas de Datos de Seguridad proporcionan información crítica sobre peligros, tratamientos médicos de emergencia y datos químicos. Se proporcionan muestras de SDS durante la capacitación, y se muestra a los empleados cómo leerlas y localizarlas. La información específica de la aplicación y las SDS se mantienen disponibles para todos los empleados en: <strong>{{pesticide_sds_location}}</strong>.</p>
<p><strong>9.2 - Reglas de Comunicación de Peligros:</strong> El empleador cumple con los requisitos de comunicación de peligros de la norma 3 CCR §6723. Todos los empleados revisan la información de la Serie de Seguridad A-8.</p>
<p><strong>9.3 - Cumplimiento Regulatorio:</strong> Se revisan los requisitos de seguridad del Título 3, División 6, Capítulos 3 y 4 relacionados con la seguridad de pesticidas, SDS y folletos de la Serie de Información de Seguridad de Pesticidas (PSIS). La capacitación cubre información de las etiquetas de pesticidas específicos, SDS y las Series de Seguridad A-1 a A-8, y A-10.</p>`
            },
            {
                id: "php_medical_supervision",
                title: "Medical Supervision (Organophosphates & Carbamates) / Supervisión Médica",
                content_template: `<h2>Section 10 - Medical Supervision (Organophosphates & Carbamates)</h2>
<p><strong>10.1 - Requirements and Purposes:</strong> Medical supervision (including cholinesterase monitoring) is required if organophosphate or carbamate pesticides with the signal word "DANGER" or "WARNING" are mixed, loaded, or applied for the commercial or research production of an agricultural plant commodity.</p>
<p><strong>10.2 - Sources of Information:</strong> When handling organophosphate and/or carbamate pesticides, employees are trained on the specifics of Safety Series A-10, A-6, and A-8 to understand the purposes and requirements of medical monitoring.</p>`,
                content_template_es: `<h2>Sección 10 - Supervisión Médica (Organofosforados y Carbamatos)</h2>
<p><strong>10.1 - Requisitos y Propósitos:</strong> Se requiere supervisión médica (incluido el monitoreo de colinesterasa) si se mezclan, cargan o aplican pesticidas organofosforados o carbamatos con la palabra de advertencia "PELIGRO" o "ADVERTENCIA" para la producción comercial o de investigación de un producto vegetal agrícola.</p>
<p><strong>10.2 - Fuentes de Información:</strong> Al manejar pesticidas organofosforados y/o carbamatos, los empleados son capacitados en los aspectos específicos de las Series de Seguridad A-10, A-6 y A-8 para comprender los propósitos y requisitos del monitoreo médico.</p>`
            },
            {
                id: "php_first_aid_decon",
                title: "First Aid & Emergency Decontamination / Primeros Auxilios",
                content_template: `<h2>Section 11 - First Aid & Emergency Decontamination</h2>
<p><strong>11.1 - Emergency Response:</strong> In the event of a pesticide spill or spray on the body, the affected employee must wash immediately with emergency decontamination supplies. As soon as possible, they must wash or shower with soap and water and change into clean clothes.</p>
<p><strong>11.2 - Eye Flushing:</strong> Proper emergency eye-flushing techniques are trained, emphasizing continuous flushing. Emergency first-aid kits and eye flushing supplies are stored at: <strong>{{pesticide_first_aid_kit_location}}</strong>.</p>
<p><strong>11.3 - Sources of Information:</strong> Review of Safety Series A-4. Employees are trained to decontaminate immediately after handling pesticides and after any exposure occurs.</p>`,
                content_template_es: `<h2>Sección 11 - Primeros Auxilios y Descontaminación de Emergencia</h2>
<p><strong>11.1 - Respuesta de Emergencia:</strong> En caso de que se derrame o rocíe pesticida en el cuerpo, el empleado afectado debe lavarse inmediatamente con los suministros de descontaminación de emergencia. Lo antes posible, debe lavarse o ducharse con agua y jabón y cambiarse de ropa limpia.</p>
<p><strong>11.2 - Lavado de Ojos:</strong> Se enseña la técnica correcta para el lavado de ojos de emergencia, enfatizando el enjuague continuo. Los botiquines de primeros auxilios de emergencia y los suministros para el lavado de ojos se guardan en: <strong>{{pesticide_first_aid_kit_location}}</strong>.</p>
<p><strong>11.3 - Fuentes de Información:</strong> Revisión de la Serie de Seguridad A-4. Los empleados están capacitados para descontaminarse inmediatamente después de manejar pesticidas y después de que ocurra cualquier exposición.</p>`
            },
            {
                id: "php_emergency_medical",
                title: "Emergency Medical Care & Heat Illness Prevention / Atención Médica y Prevención de Calor",
                content_template: `<h2>Section 12 - Emergency Medical Care & Heat Illness Prevention</h2>
<p><strong>12.1 - Obtaining Emergency Care:</strong> Employees must know how and when to obtain emergency medical care. Emergency medical care information is completed on Safety Series A-8 and prominently displayed at the worksite. All employees are verbally instructed on emergency medical care procedures and location of emergency services.</p>
<p><strong>12.2 - Heat Illness Prevention:</strong> Pesticide handlers working in hot environments face elevated risks of heat illness. In accordance with Title 8 CCR Section 3395, employees are verbally instructed how to prevent, recognize, and apply first aid for heat stroke or heat exhaustion. The Cal/OSHA handout, "Health Effects of Heat," is reviewed with employees.</p>
<p><strong>12.3 - Sources of Information:</strong> Safety Series A-4, Safety Series A-8, and the Cal/OSHA Heat Illness handout.</p>`,
                content_template_es: `<h2>Sección 12 - Atención Médica de Emergencia y Prevención de Enfermedades por Calor</h2>
<p><strong>12.1 - Obtención de Atención Médica:</strong> Los empleados deben saber cómo y cuándo obtener atención médica de emergencia. La información de la atención médica de emergencia se completa en la Serie de Seguridad A-8 y se exhibe de manera prominente en el sitio de trabajo. Todos los empleados reciben instrucciones verbales sobre los procedimientos de atención médica de emergencia y la ubicación de los servicios de emergencia.</p>
<p><strong>12.2 - Prevención de Enfermedades por Calor:</strong> Los manejadores de pesticidas que trabajan en ambientes calurosos enfrentan riesgos elevados de enfermedad por calor. De acuerdo con el Título 8 CCR Sección 3395, los empleados reciben instrucciones verbales sobre cómo prevenir, reconocer y aplicar primeros auxilios para la insolación o el agotamiento por calor. El folleto de Cal/OSHA "Efectos del Calor en la Salud" es revisado con los empleados.</p>
<p><strong>12.3 - Fuentes de Información:</strong> Serie de Seguridad A-4, Serie de Seguridad A-8 y el folleto de Enfermedades por Calor de Cal/OSHA.</p>`
            },
            {
                id: "php_age_restrictions",
                title: "Age Requirements, Entry Restraints, Family Protection & Employee Rights / Restricciones y Derechos",
                content_template: `<h2>Section 13 - Age Requirements, Entry Restraints, Family Protection & Employee Rights</h2>
<p><strong>13.1 - Age Limits:</strong> {{client_name}} shall not permit an employee under 18 years of age to handle any pesticide used in the commercial or research production of an agricultural commodity, or to enter a field under a Restricted Entry Interval (REI).</p>
<p><strong>13.2 - Field Posting & REI:</strong> Treated fields must be posted with warning signs if required by product labeling. Employees are strictly prohibited from entering treated areas during the Restricted Entry Interval (REI). The standard REI tracking log is maintained by <strong>{{pesticide_log_keeper}}</strong>. California Field Posting Requirements (UC ANR) are reviewed.</p>
<p><strong>13.3 - Family and Home Protection:</strong> Handlers are instructed never to take pesticides or pesticide containers home. To protect children and pregnant women, handlers must:</p>
<ul>
    <li>Keep children and nonworking family members away from treated areas.</li>
    <li>Remove boots or shoes and work clothes before entering the home.</li>
    <li>Wash or shower before having physical contact with children or family members.</li>
</ul>
<p><strong>13.4 - Reporting Violations:</strong> To report suspected pesticide use violations, employees can call the local County Agricultural Commissioner’s office at <strong>{{agricultural_commissioner_phone}}</strong>, or call toll-free 1-87PestLine (1-877-378-5463). There will be no retaliation for reporting.</p>
<p><strong>13.5 - Employee Rights:</strong> Handlers have the right to personally receive information about pesticides they may be exposed to, designated physician access to records, protection against retaliation, and the right to report violations. Safety Series A-6 and A-8 cover these rights.</p>`,
                content_template_es: `<h2>Sección 13 - Requisitos de Edad, Restricciones de Entrada, Protección Familiar y Derechos del Empleado</h2>
<p><strong>13.1 - Límites de Edad:</strong> {{client_name}} no permitirá que ningún empleado menor de 18 años maneje ningún pesticida utilizado en la producción comercial o de investigación de un producto agrícola, ni que ingrese a un campo bajo un Intervalo de Entrada Restringido (REI).</p>
<p><strong>13.2 - Publicación de Campos y REI:</strong> Los campos tratados deben señalizarse con letreros de advertencia si la etiqueta del producto lo requiere. Los empleados tienen estrictamente prohibido ingresar a las áreas tratadas durante el Intervalo de Entrada Restringido (REI). El registro de seguimiento de REI estándar es mantenido por <strong>{{pesticide_log_keeper}}</strong>. Se revisan los Requisitos de Publicación de Campos de California (UC ANR).</p>
<p><strong>13.3 - Protección de la Familia y el Hogar:</strong> Se instruye a los manejadores que nunca lleven pesticidas ni contenedores de pesticidas a casa. Para proteger a los niños y a las mujeres embarazadas, los manejadores deben:</p>
<ul>
    <li>Mantener a los niños y familiares que no trabajan alejados de las áreas tratadas.</li>
    <li>Quitarse las botas o zapatos y la ropa de trabajo antes de entrar al hogar.</li>
    <li>Lavarse o ducharse antes de tener contacto físico con niños o familiares.</li>
</ul>
<p><strong>13.4 - Reportar Violaciones:</strong> Para reportar sospechas de violaciones en el uso de pesticidas, los empleados pueden llamar a la oficina del Comisionado de Agricultura del Condado local al <strong>{{agricultural_commissioner_phone}}</strong>, o llamar sin costo al 1-87PestLine (1-877-378-5463). No habrá represalias por reportar.</p>
<p><strong>13.5 - Derechos del Empleado:</strong> Los manejadores tienen derecho a recibir personalmente información sobre los pesticidas a los que puedan estar expuestos, acceso de su médico designado a los registros, protección contra medidas de represalia y el derecho a reportar violaciones. Las Series de Seguridad A-6 y A-8 cubren estos derechos.</p>`
            }
        ]
    },
    {
        id: "rup",
        name: "Respirator Use Program",
        abbreviation: "RUP",
        content_template: `<h1>Respiratory Protection Program (RUP)</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Effective Date:</strong> {{effective_date}}</p>
<p><strong>Program Administrator:</strong> {{respirator_program_administrator}}</p>
<p>This program is established in compliance with Cal/OSHA Title 8, Section 5144. It covers fit-testing, medical evaluations, and maintenance of respirators. {{client_name}} provides respirators to employees when such equipment is necessary to protect their health against dusts, fumes, mists, or organic vapors.</p>`,
        content_template_es: `<h1>Programa de Protección Respiratoria (RUP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<p><strong>Administrador del Programa:</strong> {{respirator_program_administrator}}</p>
<p>Este programa se establece de conformidad con la norma de Cal/OSHA Título 8, Sección 5144. Abarca las pruebas de ajuste, evaluaciones médicas y mantenimiento de respiradores. {{client_name}} proporciona respiradores a los empleados cuando dicho equipo es necesario para proteger su salud contra polvos, humos, neblinas o vapores orgánicos.</p>`,
        subsections: [
            {
                id: "rup_admin_duties",
                title: "Program Scope, Administration & General Responsibilities / Alcance y Responsabilidades",
                content_template: `<h2>Section 1 - Program Scope, Administration & General Responsibilities</h2>
<p><strong>1.1 - Scope:</strong> This Respiratory Protection Program is established in compliance with T8 CCR section 5144 and T3 section 6739 as an important component of our Injury and Illness Prevention Program (IIPP) to enhance employee health and safety. Workers participating in the program do so at no cost. Refer to Appendix I for definitions of terms and acronyms.</p>
<p><strong>1.2 - Program Administrator:</strong> <strong>{{respirator_program_administrator}}</strong> is the Respiratory Protection Program Administrator and has full authority and responsibility for implementing and maintaining this program. The Administrator's duties include hazard identification, respirator selection, medical surveillance coordination, fit testing oversight, maintenance procedures, cartridge schedules, user seal checks, and recordkeeping.</p>
<p><strong>1.3 - Supervisor Responsibilities:</strong> Supervisors must ensure employees under their supervision receive training, fit testing, and medical evaluations. They must enforce respirator use, ensure availability of equipment, confirm respirators are properly cleaned/stored, and monitor work areas for new hazards.</p>
<p><strong>1.4 - Employee Responsibilities:</strong> Employees must wear their respirators when and where required, care for and store them in sanitary locations, change cartridges according to change-out schedules, and inform their supervisor if the respirator no longer fits or of any workplace hazards.</p>`,
                content_template_es: `<h2>Sección 1 - Alcance del Programa, Administración y Responsabilidades Generales</h2>
<p><strong>1.1 - Alcance:</strong> Este Programa de Protección Respiratoria se establece de conformidad con las normas T8 CCR sección 5144 y T3 sección 6739 como un componente importante de nuestro Programa de Prevención de Lesiones y Enfermedades (IIPP) para mejorar la salud y la seguridad de los empleados. Los trabajadores que participan en el programa lo hacen sin costo alguno. Consulte el Apéndice I para obtener definiciones de términos y siglas.</p>
<p><strong>1.2 - Administrador del Programa:</strong> <strong>{{respirator_program_administrator}}</strong> es el Administrador del Programa de Protección Respiratoria y tiene la plena autoridad y responsabilidad de implementar y mantener este programa. Las funciones del Administrador incluyen la identificación de peligros, selección de respiradores, coordinación de la vigilancia médica, supervisión de las pruebas de ajuste, procedimientos de mantenimiento, cronogramas de cartuchos, controles de sellado del usuario y mantenimiento de registros.</p>
<p><strong>1.3 - Responsabilidades del Supervisor:</strong> Los supervisores deben asegurarse de que los empleados bajo su supervisión reciban capacitación, pruebas de ajuste y evaluaciones médicas. Deben hacer cumplir el uso de respiradores, garantizar la disponibilidad de equipos, confirmar que se limpien/almacenen adecuadamente y monitorear las áreas de trabajo en busca de nuevos peligros.</p>
<p><strong>1.4 - Responsabilidades del Empleado:</strong> Los empleados deben usar sus respiradores cuando y donde sea requerido, cuidarlos y almacenarlos en lugares sanitarios, cambiar los cartuchos de acuerdo con los cronogramas de cambio e informar a su supervisor si el respirador ya no se ajusta bien o si detectan peligros en el lugar de trabajo.</p>`
            },
            {
                id: "rup_selection_hazards",
                title: "Respirator Selection & Hazard Evaluation Procedures / Selección de Respirador y Peligros",
                content_template: `<h2>Section 2 - Respirator Selection & Hazard Evaluation Procedures</h2>
<p><strong>2.1 - Hazard Evaluation:</strong> A hazard evaluation will be conducted for each work process or area when it is reasonable to suspect employees may be exposed to airborne contaminants in excess of Cal/OSHA Permissible Exposure Limits (PELs). This includes integrating our Hazard Communication Program, obtaining Safety Data Sheets (SDSs), reviewing processes, and exposure monitoring. IDLH (immediately dangerous to life or health) conditions are assumed if exposures cannot be evaluated.</p>
<p><strong>2.2 - Selection Criteria:</strong> Respirators are selected based on the hazards, Assigned Protection Factors (APFs), and calculated Maximum Use Concentrations (MUCs). Only National Institute of Occupational Safety and Health (NIOSH)-certified respirators will be selected and used in compliance with their certification.</p>
<p><strong>2.3 - Non-IDLH Atmospheres:</strong> For non-IDLH atmospheres, respirators must be Air Purifying Respirators (APRs) equipped with end-of-service-life indicators (ESLIs) or NIOSH-certified particulate filters as appropriate for the chemical nature and physical form of the contaminant.</p>`,
                content_template_es: `<h2>Sección 2 - Procedimientos de Selección de Respirador y Evaluación de Peligros</h2>
<p><strong>2.1 - Evaluación de Peligros:</strong> Se realizará una evaluación de peligros para cada proceso o área de trabajo cuando sea razonable sospechar que los empleados pueden estar expuestos a contaminantes del aire que excedan los Límites de Exposición Permisibles (PEL) de Cal/OSHA. Esto incluye la integración de nuestro Programa de Comunicación de Peligros, obtención de Hojas de Datos de Seguridad (SDS), revisión de procesos y monitoreo de exposición. Se asumen condiciones IDLH (inmediatamente peligrosas para la vida o la salud) si las exposiciones no pueden evaluarse.</p>
<p><strong>2.2 - Criterios de Selección:</strong> Los respiradores se seleccionan en función de los peligros, los Factores de Protección Asignados (APF) y las Concentraciones Máximas de Uso (MUC) calculadas. Solo se seleccionarán y usarán respiradores certificados por el Instituto Nacional de Seguridad y Salud Ocupacional (NIOSH) de conformidad con su certificación.</p>
<p><strong>2.3 - Atmósferas No-IDLH:</strong> Para atmósferas no-IDLH, los respiradores deben ser Respiradores Purificadores de Aire (APR) equipados con indicadores de fin de vida útil (ESLI) o filtros de partículas certificados por NIOSH según corresponda a la naturaleza química y forma física del contaminante.</p>`
            },
            {
                id: "rup_medical_standards",
                title: "Medical Evaluation Standards & Procedures / Evaluaciones Médicas",
                content_template: `<h2>Section 3 - Medical Evaluation Standards & Procedures</h2>
<p><strong>3.1 - Clearance Requirement:</strong> Employees are not permitted to wear respirators (except for voluntary dust masks) until a physician or licensed healthcare professional (PLHCP) has determined they are medically able to do so. Our designated PLHCP is <strong>{{respirator_medical_provider}}</strong>, located at <strong>{{respirator_medical_provider_address}}</strong>, Phone: <strong>{{respirator_medical_provider_phone}}</strong>.</p>
<p><strong>3.2 - Administration & Confidentiality:</strong> The medical questionnaire and exams are administered confidentially during normal working hours at no cost. If an employee cannot read the questionnaire, they will be sent directly to the PLHCP. Sealed envelopes are used to submit questionnaires to protect medical privacy. Clearances are kept on file in the safety office by <strong>{{medical_clearance_keeper}}</strong>.</p>
<p><strong>3.3 - PAPR Alternative:</strong> If the PLHCP finds a medical condition preventing negative pressure respirator use, we will provide a Powered Air-Purifying Respirator (PAPR) if the employee is cleared to use one.</p>
<p><strong>3.4 - Reevaluation Triggers:</strong> Additional medical evaluations are provided if the employee reports signs/symptoms affecting respirator use (shortness of breath, dizziness, chest pain), if a supervisor or PLHCP recommends reevaluation, or if changes in workplace conditions increase the physiological burden.</p>`,
                content_template_es: `<h2>Sección 3 - Normas y Procedimientos de Evaluación Médica</h2>
<p><strong>3.1 - Requisito de Autorización:</strong> No se permite a los empleados usar respiradores (excepto para el uso voluntario de mascarillas contra el polvo) hasta que un médico o profesional de la salud con licencia (PLHCP) haya determinado que están médicamente aptos para hacerlo. Nuestro PLHCP designado es <strong>{{respirator_medical_provider}}</strong>, ubicado en <strong>{{respirator_medical_provider_address}}</strong>, Teléfono: <strong>{{respirator_medical_provider_phone}}</strong>.</p>
<p><strong>3.2 - Administración y Confidencialidad:</strong> El cuestionario médico y los exámenes se administran de forma confidencial durante las horas normales de trabajo sin costo alguno. Si un empleado no puede leer el cuestionario, será enviado directamente al PLHCP. Se utilizan sobres sellados para enviar los cuestionarios para proteger la privacidad médica. Las autorizaciones se mantienen en archivo en la oficina de seguridad por <strong>{{medical_clearance_keeper}}</strong>.</p>
<p><strong>3.3 - Alternativa PAPR:</strong> Si el PLHCP detecta una condición médica que impide el uso de un respirador de presión negativa, proporcionaremos un Respirador Purificador de Aire Motorizado (PAPR) si el empleado está autorizado para usarlo.</p>
<p><strong>3.4 - Activadores de Reevaluación:</strong> Se proporcionan evaluaciones médicas adicionales si el empleado informa signos/síntomas que afectan el uso del respirador (dificultad para respirar, mareos, dolor en el pecho), si un supervisor o PLHCP recomienda la reevaluación, o si los cambios en las condiciones de trabajo aumentan la carga fisiológica.</p>`
            },
            {
                id: "rup_fit_standards",
                title: "Fit Testing Protocols & Frequency / Pruebas de Ajuste",
                content_template: `<h2>Section 4 - Fit Testing Protocols & Frequency</h2>
<p><strong>4.1 - Requirements and Protocols:</strong> All employees required to wear tight-fitting facepiece respirators must pass a fit test prior to initial use, whenever a different respirator facepiece is used, and at least annually. Fit-testing is conducted by <strong>{{fit_test_provider}}</strong> in accordance with T8 CCR §5144 Appendix A protocols.</p>
<p><strong>4.2 - Workplace Protocol:</strong> Our workplace uses the Qualitative Fit Test (QLFT) - Saccharin Solution Aerosol protocol. Employees are fit-tested to the same make, model, style, and size of respirator they actually wear.</p>
<p><strong>4.3 - QLFT Limit:</strong> The maximum Assigned Protection Factor (APF) of any negative pressure tight-fitting APR fit tested via QLFT is 10. To assume a higher APF (e.g. 50 for a full-face APR), a Quantitative Fit Test (QNFT) protocol must be used.</p>`,
                content_template_es: `<h2>Sección 4 - Protocolos y Frecuencia de las Pruebas de Ajuste</h2>
<p><strong>4.1 - Requisitos y Protocolos:</strong> Todos los empleados que deben usar respiradores con máscara de ajuste apretado deben pasar una prueba de ajuste antes del uso inicial, cuando se use una máscara diferente y al menos una vez al año. Las pruebas de ajuste son realizadas por <strong>{{fit_test_provider}}</strong> de acuerdo con los protocolos del Apéndice A de T8 CCR §5144.</p>
<p><strong>4.2 - Protocolo del Sitio de Trabajo:</strong> Nuestro lugar de trabajo utiliza el protocolo de Prueba de Ajuste Cualitativa (QLFT) - Aerosol de Solución de Sacarina. Los empleados se someten a la prueba de ajuste con la misma marca, modelo, estilo y tamaño de respirador que realmente usan.</p>
<p><strong>4.3 - Límite de QLFT:</strong> El Factor de Protección Asignado (APF) máximo de cualquier APR de ajuste apretado de presión negativa probado a través de QLFT será 10. Para asumir un APF más alto (por ejemplo, 50 para un APR de cara completa), se debe utilizar un protocolo de Prueba de Ajuste Cuantitativa (QNFT).</p>`
            },
            {
                id: "rup_use_procedures",
                title: "Procedures for Proper Respirator Use / Reglas de Uso de Respiradores",
                content_template: `<h2>Section 5 - Procedures for Proper Respirator Use</h2>
<p><strong>5.1 - Donning and Seals:</strong> All filters, cartridges, and canisters must carry appropriate NIOSH labels, which must not be defaced. Employees must conduct user seal checks (according to Appendix F) every time they don a respirator.</p>
<p><strong>5.2 - Seal Interference:</strong> Tight-fitting respirators must not be worn by employees with facial hair that comes between the sealing surface of the facepiece and the face, or that interferes with valve function. Headphones, jewelry, prescription eyewear, or other PPE must not interfere with the respirator seal.</p>
<p><strong>5.3 - Leaving the Work Area:</strong> Employees must leave the respirator use area to wash their face and mask to prevent irritation, if they detect breakthrough, leakage, or changes in breathing resistance, or to replace filter cartridges.</p>
<p><strong>5.4 - Supervisor Oversight:</strong> Supervisors must ensure employees follow use rules and replace/repair respirators immediately if breakthrough, leakage, or breathing resistance changes are detected.</p>`,
                content_template_es: `<h2>Sección 5 - Procedimientos para el Uso Correcto del Respirador</h2>
<p><strong>5.1 - Colocación y Sellados:</strong> Todos los filtros y cartuchos deben llevar etiquetas NIOSH correspondientes, que no deben dañarse. Los empleados deben realizar comprobaciones de sellado del usuario (de acuerdo con el Apéndice F) cada vez que se coloquen un respirador.</p>
<p><strong>5.2 - Interferencia de Sellado:</strong> Los empleados con vello facial que se interponga entre la superficie de sellado de la máscara y la piel, o que interfiera con la función de la válvula, no deben usar respiradores de ajuste apretado. Los auriculares, joyas, lentes recetados u otro PPE no deben interferir con el sello del respirador.</p>
<p><strong>5.3 - Salida del Área de Trabajo:</strong> Los empleados deben abandonar el área de uso del respirador para lavarse la cara y la máscara para prevenir la irritación, si detectan penetración de vapor, fugas o cambios en la resistencia respiratoria, o para reemplazar cartuchos de filtro.</p>
<p><strong>5.4 - Supervisión:</strong> Los supervisores deben asegurarse de que los empleados sigan las reglas de uso y reemplacen o reparen los respiradores inmediatamente si se detectan fugas, penetración de gases o resistencia respiratoria.</p>`
            },
            {
                id: "rup_cleaning_maintenance",
                title: "Respirator Cleaning & Maintenance / Limpieza y Mantenimiento",
                content_template: `<h2>Section 6 - Respirator Cleaning & Maintenance</h2>
<p><strong>6.1 - Cleaning Standards:</strong> Respirators must be regularly cleaned and disinfected at our shop/office facilities located at <strong>{{respirator_maintenance_location}}</strong>. Exclusive-use respirators are cleaned as often as necessary to maintain sanitary conditions. Shared respirators are cleaned and disinfected before being worn by different individuals. Cleaning must follow the instructions in Appendix G.</p>
<p><strong>6.2 - Inspections and Repairs:</strong> Maintenance involves a thorough visual inspection (Appendix H) for cleanliness and defects before each use and during cleaning. Worn or deteriorated parts will be replaced prior to use. No components will be replaced or repairs made beyond those recommended by the manufacturer.</p>`,
                content_template_es: `<h2>Sección 6 - Procedimientos de Almacenamiento, Limpieza y Mantenimiento</h2>
<p><strong>6.1 - Normas de Limpieza:</strong> Los respiradores deben limpiarse y desinfectarse regularmente en nuestras instalaciones de taller/oficina ubicadas en <strong>{{respirator_maintenance_location}}</strong>. Los respiradores de uso exclusivo se limpian con la frecuencia necesaria para mantener condiciones sanitarias. Los respiradores compartidos se limpian y desinfectan antes de ser usados por diferentes personas. La limpieza debe seguir las instrucciones del Apéndice G.</p>
<p><strong>6.2 - Inspecciones y Reparaciones:</strong> El mantenimiento implica una inspección visual exhaustiva (Apéndice H) para detectar limpieza y defectos antes de cada uso y durante la limpieza. Las piezas desgastadas o deterioradas se reemplazarán antes de su uso. No se reemplazarán componentes ni se realizarán reparaciones más allá de las recomendadas por el fabricante.</p>`
            },
            {
                id: "rup_cartridge_schedules",
                title: "Filter & Cartridge Change-Out Schedules / Programas de Cambio de Cartuchos",
                content_template: `<h2>Section 7 - Filter & Cartridge Change-Out Schedules</h2>
<p><strong>7.1 - Particulate Filters:</strong> Employees wearing Air Purifying Respirators (APRs) for protection against airborne particulates must change the filters on their respirators as soon as they experience difficulty breathing (i.e. increased breathing resistance) while wearing their masks.</p>
<p><strong>7.2 - Gas/Vapor Cartridges:</strong> Cartridge change-out schedules are based on the manufacturer’s instructions and California Department of Pesticide Regulation guidelines (PSIS A-5). The change-out schedule begins as soon as cartridges are unsealed, not when employees start to use them. The table below outlines our change-out schedule for routine operations:</p>
<table style="width:100%; border-collapse:collapse; margin-top:10px;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Task / Location / Operation</th>
            <th>Respirator Model & Cartridge Type</th>
            <th>Airborne Contaminants</th>
            <th>Change-out Schedule (Hours)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Pesticide Mixing/Loading/Applying</td>
            <td>3M 6200/07025, Organic Vapor (OV)</td>
            <td>Organic vapors created by pesticides</td>
            <td>We follow manufacturer's recommendations based on hours or amount of days</td>
        </tr>
    </tbody>
</table>`,
                content_template_es: `<h2>Sección 7 - Programas de Cambio de Filtros y Cartuchos</h2>
<p><strong>7.1 - Filtros de Partículas:</strong> Los empleados que usan Respiradores Purificadores de Aire (APR) para protegerse contra partículas suspendidas en el aire deben cambiar los filtros de sus respiradores tan pronto como experimenten dificultad para respirar (es decir, mayor resistencia respiratoria) al usar sus máscaras.</p>
<p><strong>7.2 - Cartuchos de Gas/Vapor:</strong> Los cronogramas de cambio de cartuchos se basan en las instrucciones del fabricante y en las pautas del Departamento de Regulación de Pesticidas de California (PSIS A-5). El cronograma de cambio comienza tan pronto como se abren los cartuchos, no cuando los empleados comienzan a usarlos. La siguiente tabla describe nuestro cronograma de cambio para las operaciones rutinarias:</p>
<table style="width:100%; border-collapse:collapse; margin-top:10px;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Tarea / Ubicación / Operación</th>
            <th>Modelo de Respirador y Tipo de Cartucho</th>
            <th>Contaminantes del Aire</th>
            <th>Programa de Cambio (Horas)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Mezcla, carga y aplicación de pesticidas</td>
            <td>3M 6200/07025, Vapor Orgánico (OV)</td>
            <td>Vapores orgánicos creados por pesticidas</td>
            <td>Seguimos las recomendaciones del fabricante basadas en horas o cantidad de días</td>
        </tr>
    </tbody>
</table>`
            },
            {
                id: "rup_storage_defects",
                title: "Respirator Storage & Defective Equipment / Almacenamiento y Equipos Defectuosos",
                content_template: `<h2>Section 8 - Respirator Storage & Defective Equipment Handling</h2>
<p><strong>8.1 - Storage:</strong> Respirators must be stored in a clean, dry area in accordance with manufacturer recommendations. Each employee will clean and inspect their own APR and store it inside its original resealable bag or a provided reusable bag in our office storage area. Each employee must write their name on the storage container. A supply of respirators and components in original packaging is stored in the shop at <strong>{{respirator_maintenance_location}}</strong>. Replacement filters are available at <strong>{{respirator_filter_location}}</strong>.</p>
<p><strong>8.2 - Defective Respirators:</strong> Respirators that are defective or have defective parts must be immediately tagged and taken out of service. Employees must report defects to their supervisor. Supervisors will tag and deliver defective respirators to the Administrator, who will temporarily remove them for repair, perform a simple fix, or dispose of them. Employees will be provided a replacement respirator they have been fit-tested for before returning to work.</p>`,
                content_template_es: `<h2>Sección 8 - Almacenamiento de Respirador y Manejo de Equipos Defectuosos</h2>
<p><strong>8.1 - Almacenamiento:</strong> Los respiradores deben almacenarse en un área limpia y seca de acuerdo con las recomendaciones del fabricante. Cada empleado limpiará e inspeccionará su propio APR y lo almacenará dentro de su bolsa resellable original o una bolsa reutilizable provista en nuestro almacenamiento de oficina. Cada empleado debe escribir su nombre en el contenedor de almacenamiento. En el taller de <strong>{{respirator_maintenance_location}}</strong> se almacena un suministro de respiradores y componentes en su empaque original. Los filtros de reemplazo están disponibles en el <strong>{{respirator_filter_location}}</strong>.</p>
<p><strong>8.2 - Respiradores Defectuosos:</strong> Los respiradores que estén defectuosos o que tengan piezas defectuosas deben etiquetarse de inmediato y retirarse de servicio. Los empleados deben informar los defectos a su supervisor. Los supervisores etiquetarán y entregarán los respiradores defectuosos al Administrador, quien decidirá si los retira temporalmente para reparación, realiza una reparación simple o los desecha. Los empleados recibirán un respirador de reemplazo para el cual hayan sido probados antes de regresar al trabajo.</p>`
            },
            {
                id: "rup_training_evaluation",
                title: "Training, Retraining & Program Evaluation / Capacitación y Evaluación del Programa",
                content_template: `<h2>Section 9 - Training, Retraining & Program Evaluation</h2>
<p><strong>9.1 - Training Requirements:</strong> Training is provided to users and supervisors on program contents, duties, and T8 CCR §5144 standards. Workers are trained prior to using respirators. Training is comprehensive, understandable, and recurs annually. Supervisors are trained prior to supervising workers who wear respirators.</p>
<p><strong>9.2 - Retraining:</strong> Retraining is provided annually or when workplace changes render previous training obsolete, if deficiencies in employee knowledge are observed, or when retraining appears necessary. Voluntary users are provided Appendix D information, translated into Spanish as needed. For new employees trained within 12 months, retraining is waived if they can demonstrate necessary knowledge.</p>
<p><strong>9.3 - Program Evaluation:</strong> The Administrator conducts periodic evaluations to ensure program implementation, consulting employees and supervisors, performing inspections, and reviewing records. Problems are reported to management with targets for correction.</p>`,
                content_template_es: `<h2>Sección 9 - Capacitación, Recapacitación y Evaluación del Programa</h2>
<p><strong>9.1 - Requisitos de Capacitación:</strong> Se proporciona capacitación a los usuarios y supervisores sobre el contenido del programa, las responsabilidades y las normas de T8 CCR §5144. Los trabajadores reciben capacitación antes de usar respiradores. La capacitación es integral, comprensible y se repite anualmente. Los supervisores son capacitados antes de supervisar a los trabajadores que usan respiradores.</p>
<p><strong>9.2 - Recapacitación:</strong> La recapacitación se brinda anualmente o cuando los cambios en el lugar de trabajo hacen que la capacitación anterior sea obsoleta, si se observan deficiencias en el conocimiento del empleado, o cuando la recapacitación parezca necesaria. A los usuarios voluntarios se les proporciona la información del Apéndice D, traducida al español según sea necesario. Para los nuevos empleados capacitados dentro de los 12 meses, se exime la recapacitación si demuestran el conocimiento necesario.</p>
<p><strong>9.3 - Evaluación del Programa:</strong> El Administrador realiza evaluaciones periódicas para asegurar la implementación del programa, consultando a empleados y supervisores, realizando inspecciones y revisando registros. Los problemas se informan a la gerencia con plazos para su corrección.</p>`
            },
            {
                id: "rup_documentation_temp",
                title: "Documentation, Recordkeeping & Temporary Employees / Documentación y Empleados Temporales",
                content_template: `<h2>Section 10 - Documentation, Recordkeeping & Temporary Employees</h2>
<p><strong>10.1 - Records Maintenance:</strong> The Administrator ensures documents (written program, fit test records, training materials) are maintained and available. Fit test records include employee name, test type, make/model/size of respirator, test date, and results. Medical questionnaires and evaluations remain confidential with the PLHCP; only PLHCP written recommendations are retained. Employees can access records by verbal request.</p>
<p><strong>10.2 - Temporary Staff:</strong> Should temporary employment services be used, temporary employees are treated as our own and included in the Respiratory Protection Program as appropriate.</p>`,
                content_template_es: `<h2>Sección 10 - Documentación, Registro de Archivos y Empleados Temporales</h2>
<p><strong>10.1 - Mantenimiento de Registros:</strong> El Administrador garantiza que los documentos (programa escrito, registros de pruebas de ajuste, materiales de capacitación) se mantengan y estén disponibles. Los registros de pruebas de ajuste incluyen el nombre del empleado, tipo de prueba, marca/modelo/tamaño del respirador, fecha y resultados. Los cuestionarios médicos y las evaluaciones son confidenciales con el PLHCP; solo se conservan las recomendaciones escritas. Los empleados pueden acceder a los registros mediante solicitud verbal.</p>
<p><strong>10.2 - Personal Temporal:</strong> En caso de que se utilicen servicios de empleo temporal, los empleados temporales serán tratados como propios y se incluirán en el Programa de Protección Respiratoria según corresponda.</p>`
            },
            {
                id: "rup_appendices_abc",
                title: "Appendix A, B & C: Use, Rosters & Exposure Assessments / Apéndices A, B y C",
                content_template: `<h2>Section 11 - Appendix A, B & C: Respiratory Use & Exposure Assessments</h2>
<h3>Appendix A - Voluntary and Required Respirator Use</h3>
<table style="width:100%; border-collapse:collapse; margin-bottom:20px;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Work Location & Task</th>
            <th>Airborne Hazardous Materials</th>
            <th>Required APF</th>
            <th>Type of Respiratory Protection</th>
            <th>Mandatory, Voluntary, or Emergency Use</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Pesticide Application</td>
            <td>Pesticides – Organic Vapors</td>
            <td>10</td>
            <td>Half-face, APR, and N95s</td>
            <td>Mandatory (when pesticide label and/or CA law requires respirator)</td>
        </tr>
        <tr>
            <td>Employees unvaccinated for COVID-19</td>
            <td>Respiratory droplets from humans</td>
            <td>N/A</td>
            <td>N95s</td>
            <td>Voluntary</td>
        </tr>
    </tbody>
</table>

<h3>Appendix B - Employees Wearing Respirators</h3>
<table style="width:100%; border-collapse:collapse; margin-bottom:20px;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Employee</th>
            <th>Make, Model, and Size of Respirator</th>
            <th>Mandatory, Emergency, or Voluntary</th>
            <th>Date of Last Medical Clearance</th>
            <th>Date of Last Fit-Test (Annual)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>{{respirator_authorized_employee}}</strong></td>
            <td><strong>{{respirator_authorized_model}}</strong></td>
            <td>Mandatory (when pesticide label/CA law requires respirator)</td>
            <td><strong>{{respirator_authorized_clearance_date}}</strong></td>
            <td><strong>{{respirator_authorized_fit_test_date}}</strong></td>
        </tr>
        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    </tbody>
</table>

<h3>Appendix C - Employee Airborne Hazardous Chemical Assessments</h3>
<table style="width:100%; border-collapse:collapse;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Work Location/Task</th>
            <th>Number of Employees</th>
            <th>Airborne Contaminants Evaluated & Dates</th>
            <th>Date of Latest Assessment</th>
            <th>Range of Exposure Levels Determined</th>
            <th>Cal/OSHA Permitted Concentration Limits</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Pesticide Application</td>
            <td>-</td>
            <td>Annually in April-June of each year</td>
            <td>April 2022</td>
            <td>PEL determinations per §5155 Table AC-1</td>
            <td>Cal/OSHA §5155 Airborne Contaminants Table AC-1 limits</td>
        </tr>
    </tbody>
</table>`,
                content_template_es: `<h2>Sección 11 - Apéndices A, B y C: Uso Respiratorio y Evaluaciones de Exposición</h2>
<h3>Apéndice A - Uso Voluntario y Obligatorio del Respirador</h3>
<table style="width:100%; border-collapse:collapse; margin-bottom:20px;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Ubicación y Tarea de Trabajo</th>
            <th>Materiales Peligrosos en el Aire</th>
            <th>APF Requerido</th>
            <th>Tipo de Protección Respiratoria</th>
            <th>Uso Obligatorio, Voluntario o de Emergencia</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Aplicación de pesticidas</td>
            <td>Pesticidas – Vapores Orgánicos</td>
            <td>10</td>
            <td>Media cara, APR y N95</td>
            <td>Obligatorio (cuando la etiqueta del pesticida y/o la ley de CA requiera respirador)</td>
        </tr>
        <tr>
            <td>Empleados no vacunados para COVID-19</td>
            <td>Gotas respiratorias de humanos</td>
            <td>N/A</td>
            <td>N95</td>
            <td>Voluntario</td>
        </tr>
    </tbody>
</table>

<h3>Apéndice B - Empleados que Usan Respiradores</h3>
<table style="width:100%; border-collapse:collapse; margin-bottom:20px;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Empleado</th>
            <th>Marca, Modelo y Tamaño del Respirador</th>
            <th>Obligatorio, de Emergencia o Voluntario</th>
            <th>Fecha de Última Autorización Médica</th>
            <th>Fecha de Última Prueba de Ajuste (Anual)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>{{respirator_authorized_employee}}</strong></td>
            <td><strong>{{respirator_authorized_model}}</strong></td>
            <td>Obligatorio (cuando la etiqueta/ley de CA requiere respirador)</td>
            <td><strong>{{respirator_authorized_clearance_date}}</strong></td>
            <td><strong>{{respirator_authorized_fit_test_date}}</strong></td>
        </tr>
        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    </tbody>
</table>

<h3>Apéndice C - Evaluaciones de Productos Químicos Peligrosos en el Aire de los Empleados</h3>
<table style="width:100%; border-collapse:collapse;" border="1" cellpadding="6">
    <thead>
        <tr style="background:#f1f5f9;">
            <th>Ubicación/Tarea de Trabajo</th>
            <th>Número de Empleados</th>
            <th>Contaminantes Evaluados y Fechas</th>
            <th>Fecha de Última Evaluación</th>
            <th>Rango de Niveles de Exposición Determinado</th>
            <th>Límites de Concentración de Cal/OSHA</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Aplicación de pesticidas</td>
            <td>-</td>
            <td>Anualmente en abril-junio de cada año</td>
            <td>Abril de 2022</td>
            <td>Determinaciones de PEL según §5155 Tabla AC-1</td>
            <td>Límites de la Tabla AC-1 de Contaminantes del Aire Cal/OSHA §5155</td>
        </tr>
    </tbody>
</table>`
            },
            {
                id: "rup_appendices_def",
                title: "Appendix D, E & F: Voluntary Info, Training Checklist & Seal Checks / Apéndices D, E y F",
                content_template: `<h2>Section 12 - Appendix D, E & F: Employee Info, Training & Seal Checks</h2>
<h3>Appendix D - Information for Employees Using Respirators When Not Required Under the Standard</h3>
<p>Respirators are an effective method of protection against designated hazards when properly selected and worn. Respirator use is encouraged even when exposures are below the exposure limit, to provide an additional level of comfort and protection for workers. However, if a respirator is used improperly or not kept clean, the respirator itself can become a hazard to the worker. Sometimes, workers may wear respirators to avoid exposures to hazards, even if the amount of hazardous substance does not exceed the limits set by Cal/OSHA standards. If a respirator is provided for your voluntary use, or if you provide your own respirator, you need to take certain precautions to be sure that the respirator itself does not present a hazard.</p>
<p>You should do the following:</p>
<ol>
    <li>Read and heed all instructions provided by the manufacturer on use, maintenance, cleaning and care, and warnings regarding the respirator’s limitations.</li>
    <li>Choose respirators certified for use to protect against the contaminant of concern. NIOSH (National Institute for Occupational Safety and Health) certifies respirators. A label or statement of certification should appear on the respirator packaging.</li>
    <li>Do not wear your respirator into atmospheres containing contaminants for which your respirator is not designated to protect against. For example, a dust filter will not protect you against gases or organic vapors.</li>
    <li>Keep track of your respirator so that you do not mistakenly use someone else’s.</li>
</ol>
<p><em>Employees receive a copy of this material, and for employees who only speak Spanish, a verbal translation is also provided.</em></p>

<h3>Appendix E - Employee Respirator Training Checklist</h3>
<ul>
    <li>Why the respirator is necessary and how improper fit, usage, or maintenance can compromise its protective effect.</li>
    <li>What the limitations and capabilities of the respirator are.</li>
    <li>How to use the respirator effectively in emergency situations, including malfunctions.</li>
    <li>How to inspect, put on/remove, use, and check respirator seals.</li>
    <li>What the procedures are for maintenance and storage.</li>
    <li>How to recognize medical signs and symptoms that may limit or prevent effective use.</li>
    <li>The general requirements of the Respiratory Protection standard (T8 CCR §5144).</li>
</ul>

<h3>Appendix F - User Seal Check Procedures</h3>
<p><strong>Positive Pressure Check:</strong> Close off the exhalation valve and exhale gently into the facepiece. The face fit is satisfactory if a slight positive pressure can be built up inside the facepiece without any evidence of outward leakage of air at the seal.</p>
<p><strong>Negative Pressure Check:</strong> Close off the inlet opening of the cartridge(s) by covering with the palm of the hand or a thin latex/nitrile glove. Inhale gently so the facepiece collapses slightly, and hold breath for ten seconds. If the facepiece remains collapsed and no inward leakage is detected, the fit is satisfactory.</p>`,
                content_template_es: `<h2>Sección 12 - Apéndices D, E y F: Información, Capacitación y Sellados</h2>
<h3>Apéndice D - Información para Empleados que Usan Respiradores Cuando No es Requerido Bajo la Norma</h3>
<p>Los respiradores son un método eficaz de protección contra peligros designados cuando se seleccionan y usan adecuadamente. Se fomenta el uso de respiradores incluso cuando las exposiciones están por debajo del límite, para proporcionar un nivel adicional de comodidad y protección. Sin embargo, si un respirador se usa incorrectamente o no se mantiene limpio, el respirador mismo puede convertirse en un peligro para el trabajador. Si se proporciona un respirador para su uso voluntario, o si usted proporciona su propio respirador, debe tomar ciertas precauciones para asegurarse de que el respirador mismo no presente un peligro.</p>
<p>Usted debe hacer lo siguiente:</p>
<ol>
    <li>Lea y siga todas las instrucciones del fabricante sobre el uso, mantenimiento, limpieza y cuidado, y las advertencias sobre las limitaciones del respirador.</li>
    <li>Elija respiradores certificados para proteger contra el contaminante de preocupación. NIOSH certifica los respiradores. Una etiqueta o declaración de certificación debe aparecer en el empaque.</li>
    <li>No use su respirador en atmósferas que contengan contaminantes para los cuales su respirador no esté diseñado. Por ejemplo, un filtro de polvo no lo protegerá contra gases o vapores orgánicos.</li>
    <li>Lleve un control de su respirador para no usar por error el de otra persona.</li>
</ol>
<p><em>Los empleados reciben una copia de este material, y para los empleados que solo hablan español, también se proporciona una traducción verbal.</em></p>

<h3>Apéndice E - Lista de Verificación de Capacitación sobre Respiradores para Empleados</h3>
<ul>
    <li>Por qué el respirador es necesario y cómo el ajuste, uso o mantenimiento incorrectos pueden comprometer su efecto protector.</li>
    <li>Cuáles son las limitaciones y capacidades del respirador.</li>
    <li>Cómo usar el respirador de manera efectiva en situaciones de emergencia, incluidas las fallas.</li>
    <li>Cómo inspeccionar, ponerse/quitarse, usar y verificar los sellados del respirador.</li>
    <li>Cuáles son los procedimientos de mantenimiento y almacenamiento.</li>
    <li>Cómo reconocer los signos y síntomas médicos que pueden limitar o impedir el uso efectivo.</li>
    <li>Los requisitos generales de la norma de Protección Respiratoria (T8 CCR §5144).</li>
</ul>

<h3>Apéndice F - Procedimientos de Comprobación del Sello del Usuario</h3>
<p><strong>Prueba de Presión Positiva:</strong> Cierre la válvula de exhalación y exhale suavemente dentro de la máscara. El ajuste facial es satisfactorio si se puede acumular una ligera presión positiva dentro de la máscara sin evidencia de fuga de aire hacia el exterior en el sello.</p>
<p><strong>Prueba de Presión Negativa:</strong> Cierre la abertura de entrada de los cartuchos cubriéndola con la palma de la mano o un guante delgado de látex/nitrilo. Inhale suavemente para que la máscara se contraiga ligeramente y contenga la respiración durante diez segundos. Si la máscara permanece contraída y no se detecta fuga hacia el interior, el ajuste es satisfactorio.</p>`
            },
            {
                id: "rup_appendices_ghi",
                title: "Appendix G, H & I: Cleaning, Inspection & Acronyms / Apéndices G, H e I",
                content_template: `<h2>Section 13 - Appendix G, H & I: Cleaning, Inspection & Definitions</h2>
<h3>Appendix G - Respirator Cleaning Procedures</h3>
<ol>
    <li>Remove filters, cartridges, or canisters. Disassemble facepieces by removing speaking diaphragms, demand/pressure-demand valve assemblies, or hoses. Discard or repair defective parts.</li>
    <li>Wash components in warm (43°C [110°F] max) water with a mild detergent or manufacturer-recommended cleaner. A stiff bristle (not wire) brush may be used.</li>
    <li>Rinse components thoroughly in clean, warm running water. Drain.</li>
    <li>Immerse components for two minutes in a hypochlorite solution (50 ppm chlorine) or aqueous iodine solution (50 ppm iodine) to disinfect.</li>
    <li>Rinse components thoroughly in clean, warm running water. Drain. Thorough rinsing is critical to prevent dermatitis and rubber degradation.</li>
    <li>Dry components with a clean lint-free cloth or air-dry.</li>
    <li>Reassemble facepiece and test the respirator.</li>
</ol>

<h3>Appendix H - Respirator Inspection Checklist</h3>
<ul>
    <li><strong>Facepiece:</strong> Pliability, cracks, tears, holes, distortion, cracked/loose lenses.</li>
    <li><strong>Valves:</strong> Residue/dirt, cracks/tears in material, distortion, proper seating.</li>
    <li><strong>Head Straps:</strong> Breaks/tears, loss of elasticity, functional buckles.</li>
    <li><strong>Filters/Cartridges:</strong> Approval label, gaskets, cracks/dents in housing, correct cartridge type.</li>
</ul>

<h3>Appendix I - Terms and Acronyms</h3>
<ul>
    <li><strong>APF (Assigned Protection Factor):</strong> The level of protection a respirator is expected to provide when effectively implemented.</li>
    <li><strong>APR (Air Purifying Respirator):</strong> Relies on filtration to remove airborne contaminants.</li>
    <li><strong>Fit Factor:</strong> A quantitative estimate of respirator fit.</li>
    <li><strong>IDLH:</strong> Immediately Dangerous to Life or Health.</li>
    <li><strong>PLHCP:</strong> Physician or other Licensed Health Care Professional.</li>
</ul>`,
                content_template_es: `<h2>Sección 13 - Apéndices G, H e I: Limpieza, Inspección y Definiciones</h2>
<h3>Apéndice G - Procedimientos de Limpieza de Respiradores</h3>
<ol>
    <li>Retire los filtros o cartuchos. Desensamble las máscaras quitando los diafragmas de habla, conjuntos de válvulas de demanda o mangueras. Deseche o repare las piezas defectuosas.</li>
    <li>Lave los componentes en agua tibia (máximo 43°C [110°F]) con un detergente suave o limpiador recomendado por el fabricante. Se puede utilizar un cepillo de cerdas rígidas (no de alambre).</li>
    <li>Enjuague bien los componentes en agua corriente limpia y tibia. Escurra.</li>
    <li>Sumerja los componentes durante dos minutos en una solución de hipoclorito (50 ppm de cloro) o solución acuosa de yodo (50 ppm de yodo) para desinfectar.</li>
    <li>Enjuague bien los componentes en agua corriente limpia y tibia. Escurra. El enjuague completo es fundamental para prevenir la dermatitis y la degradación del caucho.</li>
    <li>Seque los componentes con un paño limpio y sin pelusa o séquelos al aire.</li>
    <li>Vuelva a ensamblar la máscara y pruebe el respirador.</li>
</ol>

<h3>Apéndice H - Lista de Verificación para Inspección de Respiradores</h3>
<ul>
    <li><strong>Máscara:</strong> Flexibilidad, grietas, desgarros, agujeros, distorsión, lentes agrietados o sueltos.</li>
    <li><strong>Válvulas:</strong> Residuos o suciedad, grietas o desgarros en el material, distorsión y asentamiento adecuado.</li>
    <li><strong>Correas de la cabeza:</strong> Roturas o desgarros, pérdida de elasticidad, hebillas funcionales.</li>
    <li><strong>Filtros/Cartuchos:</strong> Etiqueta de aprobación, juntas, grietas o abolladuras en la carcasa, tipo de cartucho correcto.</li>
</ul>

<h3>Apéndice I - Términos y Siglas</h3>
<ul>
    <li><strong>APF (Factor de Protección Asignado):</strong> El nivel de protección que se espera que proporcione un respirador cuando se implementa con eficacia.</li>
    <li><strong>APR (Respirador Purificador de Aire):</strong> Depende de la filtración para eliminar los contaminantes del aire.</li>
    <li><strong>Factor de Ajuste:</strong> Una estimación cuantitativa del ajuste del respirador.</li>
    <li><strong>IDLH:</strong> Inmediatamente Peligroso para la Vida o la Salud.</li>
    <li><strong>PLHCP:</strong> Médico u otro Profesional de la Salud con Licencia.</li>
</ul>`
            }
        ]
    },
    {
        id: "hmbp",
        name: "Hazardous Materials Business Plan",
        abbreviation: "HMBP",
        content_template: `<h1>Hazardous Materials Business Plan (HMBP)</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Effective Date:</strong> {{effective_date}}</p>
<p><strong>Facility Safety Officer:</strong> {{safety_officer}}</p>
<p>This plan is developed to comply with Certified Unified Program Agency (CUPA) hazardous materials reporting requirements for {{client_name}}'s facility located at {{client_address}}. Under the administration of {{safety_officer}}, safety data sheets (SDS) are maintained, and hazardous waste inventories are reported.</p>`,
        content_template_es: `<h1>Plan de Negocios de Materiales Peligrosos (HMBP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<p><strong>Oficial de Seguridad de la Instalación:</strong> {{safety_officer}}</p>
<p>Este plan se desarrolla para cumplir con los requisitos de informes de materiales peligrosos de la Agencia del Programa Unificado Certificado (CUPA) para la instalación de {{client_name}} ubicada en {{client_address}}. Bajo la administración de {{safety_officer}}, se mantienen las hojas de datos de seguridad (SDS) y se informa sobre los inventarios de residuos peligrosos.</p>`,
        subsections: [
            {
                id: "hmbp_inventory",
                title: "Chemical Inventory / Inventario Químico",
                content_template: `<h2>1. Chemical Inventory</h2>
<p>A list of hazardous materials stored on-site in reportable quantities (55 gallons, 500 pounds, or 200 cubic feet) will be updated annually and submitted to the California Environmental Reporting System (CERS). The facility CERS account ID is {{facility_cers_id}}.</p>`,
                content_template_es: `<h2>1. Inventario Químico</h2>
<p>Una lista de materiales peligrosos almacenados en el sitio en cantidades reportables (55 galones, 500 libras o 200 pies cúbicos) se actualizará anualmente y se enviará al Sistema de Informes Ambientales de California (CERS). El ID de la cuenta CERS de la instalación es {{facility_cers_id}}.</p>`
            },
            {
                id: "hmbp_spill",
                title: "Spill Response & Mitigation / Respuesta a Derrames",
                content_template: `<h2>2. Spill Response & Mitigation</h2>
<p>In the event of a release, containment protocols will be enacted immediately. Employees must follow instructions from {{safety_officer}}. Spill kits are located at {{spill_kit_location}}. For reportable spills, CUPA must be notified immediately at {{cupa_contact_number}}.</p>`,
                content_template_es: `<h2>2. Respuesta y Mitigación de Derrames</h2>
<p>En caso de una liberación, los protocolos de contención se promulgarán de inmediato. Los empleados deben seguir las instrucciones de {{safety_officer}}. Los kits de derrame se encuentran en {{spill_kit_location}}. Para derrames reportables, se debe notificar a CUPA de inmediato al {{cupa_contact_number}}.</p>`
            }
        ]
    }
];

// Default Data Seed for Industries
const defaultIndustriesSeed = [
    { id: "agriculture", name: "Agriculture", default_modules: ["iipp", "hipp", "wvpp", "epp", "php"] },
    { id: "construction", name: "Construction", default_modules: ["iipp", "hipp", "wvpp", "epp", "rup"] },
    { id: "shops", name: "Shops / Manufacturing", default_modules: ["iipp", "wvpp", "epp"] },
    { id: "cattle", name: "Cattle / Ranching", default_modules: ["iipp", "hipp", "wvpp", "epp"] },
    { id: "public_works", name: "Public Works", default_modules: ["iipp", "hipp", "wvpp", "epp"] }
];

// Core Application State
let dbModules = [];
let dbIndustries = [];
let dbClients = [];
let currentStep = 1;

// Document Cache
let scannedPlaceholders = [];
let placeholdersByModule = {};
let modulesWithPlaceholders = [];
let customFieldsSubStep = 0;
let customFieldValues = {};

// DOM Elements
const wizard = {
    // Buttons
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    btnExportPdf: document.getElementById('btnExportPdf'),
    btnExportWord: document.getElementById('btnExportWord'),
    btnSavePlan: document.getElementById('btnSavePlan'),

    // Step sections
    steps: [
        document.getElementById('stepSection1'),
        document.getElementById('stepSection2'),
        document.getElementById('stepSection3'),
        document.getElementById('stepSection4')
    ],
    // Indicators
    progSteps: [
        document.getElementById('progStep1'),
        document.getElementById('progStep2'),
        document.getElementById('progStep3'),
        document.getElementById('progStep4')
    ],
    progLines: [
        document.getElementById('progLine1'),
        document.getElementById('progLine2'),
        document.getElementById('progLine3')
    ],

    // Client Selector
    selectClient: document.getElementById('selectClient'),
    clientSpinner: document.getElementById('clientLoadingSpinner'),

    // Input fields Step 1
    clientName: document.getElementById('clientName'),
    clientAddress: document.getElementById('clientAddress'),
    safetyOfficer: document.getElementById('safetyOfficer'),
    planDate: document.getElementById('planDate'),
    includeSpanish: document.getElementById('includeSpanish'),

    // step containers
    modulesContainer: document.getElementById('modulesEngineContainer'),
    placeholdersGrid: document.getElementById('placeholderInputsGrid'),
    noPlaceholdersState: document.getElementById('noPlaceholdersState'),
    previewPane: document.getElementById('documentPreviewPane')
};

// Start Execution
document.addEventListener('DOMContentLoaded', async () => {
    // Set default date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    wizard.planDate.value = `${yyyy}-${mm}-${dd}`;

    try {
        // 1. Seed database first (handles migration if Spanish properties or new subsections missing)
        await seedDatabaseIfNeeded();

        // 2. Fetch configurations
        await fetchDatabaseConfigs();

        // 3. Load clients from database
        await loadClientsList();

        // 4. Render Step 2 HTML baseline
        renderModulesChecklist();

        // 5. Initialize listeners
        initListeners();

        // 6. Set initial industry pre-checks
        updateBaselineFromIndustry();

    } catch (error) {
        console.error("Initialization error:", error);
    }
});

// Seed relational collections if empty (or missing bilingual/expanded fields)
async function seedDatabaseIfNeeded() {
    try {
        const modulesSnap = await db.collection("safety_modules").get();
        let needsModulesSeed = false;
        
        if (modulesSnap.empty) {
            needsModulesSeed = true;
        } else {
            // Find iipp and check if it has the new subsections length
            const iippDoc = modulesSnap.docs.find(doc => doc.id === "iipp");
            if (!iippDoc) {
                needsModulesSeed = true;
            } else {
                const data = iippDoc.data();
                // Old seed had 6 subsections. Beefed up has 21 subsections.
                if (!data.content_template_es || !data.subsections || data.subsections.length < 15) {
                    needsModulesSeed = true;
                    console.log("Expanding database schemas to integrate new IIPP safety subsections...");
                }
            }

            // Find hipp and check if it has the new subsections length
            const hippDoc = modulesSnap.docs.find(doc => doc.id === "hipp");
            if (!hippDoc) {
                needsModulesSeed = true;
            } else {
                const data = hippDoc.data();
                // Old HIPP had 4 subsections. New HIPP has 8 subsections.
                if (!data.subsections || data.subsections.length < 7) {
                    needsModulesSeed = true;
                    console.log("Expanding database schemas to integrate new HIPP safety subsections...");
                }
            }

            // Find php and check if it has the new subsections length
            const phpDoc = modulesSnap.docs.find(doc => doc.id === "php");
            if (!phpDoc) {
                needsModulesSeed = true;
            } else {
                const data = phpDoc.data();
                // Old PHP had 3 subsections. New PHP has 13 subsections.
                if (!data.subsections || data.subsections.length < 10) {
                    needsModulesSeed = true;
                    console.log("Expanding database schemas to integrate new PHP safety subsections...");
                }
            }

            // Find rup and check if it has the new subsections length
            const rupDoc = modulesSnap.docs.find(doc => doc.id === "rup");
            if (!rupDoc) {
                needsModulesSeed = true;
            } else {
                const data = rupDoc.data();
                // Old RUP had 3 subsections. New RUP has 13 subsections.
                if (!data.subsections || data.subsections.length < 10) {
                    needsModulesSeed = true;
                    console.log("Expanding database schemas to integrate new RUP safety subsections...");
                }
            }

            // Find epp and check if it has the new subsections length
            const eppDoc = modulesSnap.docs.find(doc => doc.id === "epp");
            if (!eppDoc) {
                needsModulesSeed = true;
            } else {
                const data = eppDoc.data();
                // Old EAP had 4 subsections. New EAP has 13 subsections.
                if (!data.subsections || data.subsections.length < 13) {
                    needsModulesSeed = true;
                    console.log("Expanding database schemas to integrate new EPP (Emergency Action Plan) safety subsections...");
                }
            }

            // Find wvpp and check if it has the new subsections length
            const wvppDoc = modulesSnap.docs.find(doc => doc.id === "wvpp");
            if (!wvppDoc) {
                needsModulesSeed = true;
            } else {
                const data = wvppDoc.data();
                // Old WVPP had 4 subsections. New WVPP has 15 subsections.
                if (!data.subsections || data.subsections.length < 15) {
                    needsModulesSeed = true;
                    console.log("Expanding database schemas to integrate new WVPP (Workplace Violence Prevention Program) safety subsections...");
                }
            }
        }

        if (needsModulesSeed) {
            console.log("Seeding safety modules...");
            const batch = db.batch();
            defaultModulesSeed.forEach(mod => {
                const docRef = db.collection("safety_modules").doc(mod.id);
                batch.set(docRef, mod);
            });
            await batch.commit();
        }

        // Check industries
        const industriesSnap = await db.collection("industries").limit(1).get();
        if (industriesSnap.empty) {
            console.log("Seeding default industries...");
            const batch = db.batch();
            defaultIndustriesSeed.forEach(ind => {
                const docRef = db.collection("industries").doc(ind.id);
                batch.set(docRef, ind);
            });
            await batch.commit();
        }
    } catch (err) {
        console.error("Error seeding database:", err);
    }
}

// Fetch DB Configurations
async function fetchDatabaseConfigs() {
    const modulesSnap = await db.collection("safety_modules").get();
    dbModules = modulesSnap.docs.map(doc => doc.data());
    
    // Fallback override: if IIPP in Firestore is outdated (missing the custom table), use local code version
    dbModules = dbModules.map(dbMod => {
        const localMod = defaultModulesSeed.find(m => m.id === dbMod.id);
        if (localMod) {
            if (dbMod.id === 'iipp' && (!dbMod.content_template || !dbMod.content_template.includes("iipp_custom_inspections_table"))) {
                console.log("IIPP templates in Firestore are outdated. Falling back to local version.");
                return localMod;
            }
        }
        return dbMod;
    });

    // Sort modules by custom ordering
    const order = ["iipp", "hipp", "wvpp", "epp", "php", "rup", "hmbp"];
    dbModules.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

    const industriesSnap = await db.collection("industries").get();
    dbIndustries = industriesSnap.docs.map(doc => doc.data());
}

// Load Clients List from database
async function loadClientsList() {
    wizard.clientSpinner.style.display = 'block';
    try {
        const clientsSnap = await db.collection("clients").get();
        dbClients = clientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Sort alphabetically
        dbClients.sort((a,b) => (a.companyName || "").localeCompare(b.companyName || ""));

        // Populate dropdown
        wizard.selectClient.innerHTML = '<option value="">-- Load Client Data (Or Enter Manually Below) --</option>';
        dbClients.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.companyName} (${c.clientType})`;
            wizard.selectClient.appendChild(opt);
        });
    } catch (err) {
        console.error("Error fetching clients list:", err);
    } finally {
        wizard.clientSpinner.style.display = 'none';
    }
}

// Render Step 2 Checklists dynamically (Simplified Checkboxes)
function renderModulesChecklist() {
    wizard.modulesContainer.innerHTML = '';

    dbModules.forEach(mod => {
        const card = document.createElement('div');
        card.className = 'module-config-card';
        card.id = `card_${mod.id}`;

        let subHtml = '';
        let showToggle = false;

        if (mod.subsections && mod.subsections.length > 0) {
            const isIIPP = mod.id === 'iipp';
            const isHIPP = mod.id === 'hipp';
            const showList = isIIPP || isHIPP;

            if (showList) {
                showToggle = true;
                subHtml = `
                <div class="module-subsections-body">
                    <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.05em;">Sections to Include:</div>
                    <div class="subsections-grid">
                        ${mod.subsections.map(sub => {
                            if (isHIPP && sub.id !== 'hipp_indoor') {
                                // For HIPP, hide all checkboxes except hipp_indoor (Indoor Operations)
                                return `<input type="checkbox" id="sub_${sub.id}" value="${sub.id}" class="sub-checkbox" checked style="display:none;">`;
                            }
                            return `
                            <label class="subsection-item-label" for="sub_${sub.id}">
                                <input type="checkbox" id="sub_${sub.id}" value="${sub.id}" class="sub-checkbox" checked>
                                <span class="subsection-title">${sub.title}</span>
                            </label>`;
                        }).join('')}
                    </div>
                </div>`;
            } else {
                // For HMBP, RUP, PHP, EPP, WVPP, render checkboxes as hidden and checked so they are always included
                subHtml = mod.subsections.map(sub => `
                    <input type="checkbox" id="sub_${sub.id}" value="${sub.id}" class="sub-checkbox" checked style="display:none;">
                `).join('');
            }
        }

        card.innerHTML = `
            <div class="module-config-header" onclick="${showToggle ? `toggleCardExpand('${mod.id}')` : ''}" style="${showToggle ? '' : 'cursor: default;'}">
                <div class="header-left">
                    <input type="checkbox" id="mod_${mod.id}" value="${mod.id}" class="main-module-checkbox" onchange="toggleModuleCheck('${mod.id}')" onclick="event.stopPropagation();">
                    <span class="module-badge-abbrev">${mod.abbreviation}</span>
                    <span class="module-config-title">${mod.name}</span>
                </div>
                <div class="header-right">
                    <span class="module-status-pill included">Included</span>
                    <span class="module-status-pill excluded">Excluded</span>
                    ${showToggle ? `
                        <button class="btn-toggle-subsections" type="button" aria-label="Toggle subsections">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>
                    ` : ''}
                </div>
            </div>
            ${subHtml}
        `;
        wizard.modulesContainer.appendChild(card);
    });
}

// Visual Toggles
window.toggleCardExpand = function(modId) {
    const card = document.getElementById(`card_${modId}`);
    if (card.querySelector('.module-subsections-body')) {
        card.classList.toggle('expanded');
    }
};

window.toggleModuleCheck = function(modId) {
    const card = document.getElementById(`card_${modId}`);
    const checkbox = document.getElementById(`mod_${modId}`);
    
    if (checkbox.checked) {
        card.classList.add('checked');
        // Auto-check all sub checkboxes
        card.querySelectorAll('.sub-checkbox').forEach(cb => cb.checked = true);
    } else {
        card.classList.remove('checked');
        card.classList.remove('expanded');
        // Uncheck all sub checkboxes
        card.querySelectorAll('.sub-checkbox').forEach(cb => cb.checked = false);
    }
};

// Setup Listeners
function initListeners() {
    // Dropdown client loader
    wizard.selectClient.addEventListener('change', (e) => {
        const id = e.target.value;
        if (!id) return;
        const client = dbClients.find(c => c.id === id);
        if (client) {
            wizard.clientName.value = client.companyName || '';
            wizard.clientAddress.value = client.officeAddress || client.mailingAddress || '';
            
            // Safety officer mapping
            wizard.safetyOfficer.value = client.contactName || client.trainerAssigned || '';

            // Map Industry selection automatically from client database properties
            let matchedIndId = '';
            const type = (client.clientType || "").toLowerCase();
            const notes = (client.notes || "").toLowerCase();
            
            if (type.includes("cupa") || notes.includes("shop") || notes.includes("garage")) {
                matchedIndId = "shops";
            } else if (notes.includes("ag ") || notes.includes("orchard") || notes.includes("vineyard") || notes.includes("farm")) {
                matchedIndId = "agriculture";
            } else if (notes.includes("cattle") || notes.includes("dairy") || notes.includes("feedlot")) {
                matchedIndId = "cattle";
            } else if (notes.includes("construction") || notes.includes("grading") || notes.includes("paving")) {
                matchedIndId = "construction";
            } else if (notes.includes("public") || notes.includes("city") || notes.includes("county")) {
                matchedIndId = "public_works";
            }

            if (matchedIndId) {
                const rad = document.getElementById(`ind${capitalizeFirstLetter(matchedIndId)}`) || 
                            document.querySelector(`input[name="industry"][value="${matchedIndId}"]`);
                if (rad) {
                    rad.checked = true;
                    updateBaselineFromIndustry();
                }
            }
        }
    });

    // Industry radio triggers
    document.querySelectorAll('input[name="industry"]').forEach(rad => {
        rad.addEventListener('change', updateBaselineFromIndustry);
    });

    // Wizard Nav Buttons
    wizard.btnNext.addEventListener('click', navigateNext);
    wizard.btnPrev.addEventListener('click', navigatePrev);

    // Export Triggers
    wizard.btnExportPdf.addEventListener('click', exportToPdf);
    wizard.btnExportWord.addEventListener('click', exportToWord);
    wizard.btnSavePlan.addEventListener('click', savePlanToCloud);
}

function capitalizeFirstLetter(string) {
    if (string === "public_works") return "PW";
    if (string === "agriculture") return "Ag";
    if (string === "construction") return "Const";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Link selected industry to baseline checked modules
function updateBaselineFromIndustry() {
    const selectedInd = document.querySelector('input[name="industry"]:checked').value;
    const industryConfig = dbIndustries.find(ind => ind.id === selectedInd) || 
                           defaultIndustriesSeed.find(ind => ind.id === selectedInd);
    
    if (!industryConfig) return;

    dbModules.forEach(mod => {
        const checkbox = document.getElementById(`mod_${mod.id}`);
        const card = document.getElementById(`card_${mod.id}`);
        if (!checkbox) return;

        if (industryConfig.default_modules.includes(mod.id)) {
            checkbox.checked = true;
            card.classList.add('checked');
            card.querySelectorAll('.sub-checkbox').forEach(cb => cb.checked = true);
        } else {
            checkbox.checked = false;
            card.classList.remove('checked');
            card.classList.remove('expanded');
            card.querySelectorAll('.sub-checkbox').forEach(cb => cb.checked = false);
        }
    });
}

// Save current custom field values in state from the DOM inputs
function saveCurrentCustomFieldValues() {
    const activeModId = modulesWithPlaceholders[customFieldsSubStep];
    if (!activeModId) return;

    const placeholders = placeholdersByModule[activeModId] || [];
    placeholders.forEach(ph => {
        const inputsEN = Array.from(document.querySelectorAll(`input[data-ph="${ph}"][data-lang="en"]`))
                            .map(inp => inp.value.trim());
        const inputsES = Array.from(document.querySelectorAll(`input[data-ph="${ph}"][data-lang="es"]`))
                            .map(inp => inp.value.trim());

        customFieldValues[ph] = {
            en: inputsEN,
            es: inputsES
        };
    });
}

// Wizard Step Navigation
async function navigateNext() {
    if (currentStep === 1) {
        // Validate Step 1
        if (!wizard.clientName.value.trim() || !wizard.clientAddress.value.trim() || !wizard.safetyOfficer.value.trim()) {
            alert("Please fill in all required fields marked with * in Step 1.");
            return;
        }
        transitionStep(2);
    } else if (currentStep === 2) {
        // Validate Step 2 - At least one module checked
        const checkedCount = document.querySelectorAll('.main-module-checkbox:checked').length;
        if (checkedCount === 0) {
            alert("Please select at least one safety program module to generate.");
            return;
        }
        
        // Scan for placeholders
        scanSelectedModulesForPlaceholders();
        
        // Render step 3 inputs starting at first program sub-step
        customFieldsSubStep = 0;
        renderPlaceholderInputs();
        
        transitionStep(3);
    } else if (currentStep === 3) {
        // Validate active sub-step inputs
        const activeInputs = Array.from(wizard.placeholdersGrid.querySelectorAll('input[required]'));
        const invalid = activeInputs.some(input => !input.value.trim());
        if (invalid) {
            alert("Please fill in all required custom fields for this program.");
            return;
        }

        saveCurrentCustomFieldValues();

        if (customFieldsSubStep < modulesWithPlaceholders.length - 1) {
            customFieldsSubStep++;
            renderPlaceholderInputs();
            
            // Adjust next button text if needed
            if (customFieldsSubStep === modulesWithPlaceholders.length - 1) {
                wizard.btnNext.innerHTML = `Compile Plan <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            } else {
                wizard.btnNext.innerHTML = `Next Step <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            }
        } else {
            compileSafetyPlan();
            transitionStep(4);
        }
    }
}

function navigatePrev() {
    if (currentStep === 3) {
        saveCurrentCustomFieldValues();
        
        if (customFieldsSubStep > 0) {
            customFieldsSubStep--;
            renderPlaceholderInputs();
            
            // Ensure next button text is "Next Step" since it's no longer the last step
            wizard.btnNext.innerHTML = `Next Step <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
        } else {
            transitionStep(2);
        }
    } else if (currentStep > 1) {
        transitionStep(currentStep - 1);
    }
}

function transitionStep(step) {
    // Hide current section, show new section
    wizard.steps[currentStep - 1].classList.remove('active');
    wizard.steps[step - 1].classList.add('active');

    // Update Progress Bar visuals
    for (let i = 1; i <= 4; i++) {
        const stepEl = wizard.progSteps[i - 1];
        const lineEl = wizard.progLines[i - 2]; 

        stepEl.classList.remove('active', 'completed');
        if (lineEl) lineEl.classList.remove('completed');

        if (i < step) {
            stepEl.classList.add('completed');
            if (lineEl) lineEl.classList.add('completed');
        } else if (i === step) {
            stepEl.classList.add('active');
        }
    }

    // Configure Button Controls
    if (step === 1) {
        wizard.btnPrev.style.display = 'none';
        wizard.btnNext.textContent = 'Next Step';
    } else {
        wizard.btnPrev.style.display = 'inline-flex';
        
        if (step === 3) {
            if (customFieldsSubStep === modulesWithPlaceholders.length - 1) {
                wizard.btnNext.innerHTML = `Compile Plan <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            } else {
                wizard.btnNext.innerHTML = `Next Step <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            }
        } else if (step === 4) {
            wizard.btnNext.style.display = 'none';
        } else {
            wizard.btnNext.innerHTML = `Next Step <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            wizard.btnNext.style.display = 'inline-flex';
        }
    }

    currentStep = step;
}

// Scans templates for custom {{placeholders}} (Checks both English and Spanish templates)
// Scans templates for custom {{placeholders}} (Checks both English and Spanish templates)
function scanSelectedModulesForPlaceholders() {
    scannedPlaceholders = [];
    placeholdersByModule = {};
    modulesWithPlaceholders = [];
    
    const reserved = ["client_name", "company_name", "client_address", "safety_officer", "effective_date"];
    const checkedModules = Array.from(document.querySelectorAll('.main-module-checkbox:checked')).map(cb => cb.value);

    // Order of modules to preserve logical progression
    const order = ["iipp", "hipp", "wvpp", "epp", "php", "rup", "hmbp"];
    checkedModules.sort((a, b) => order.indexOf(a) - order.indexOf(b));

    checkedModules.forEach(modId => {
        const mod = dbModules.find(m => m.id === modId);
        if (!mod) return;

        const modPlaceholders = [];
        
        function extractForMod(text) {
            if (!text) return;
            const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
            let match;
            while ((match = regex.exec(text)) !== null) {
                const ph = match[1];
                if (!reserved.includes(ph)) {
                    if (!modPlaceholders.includes(ph)) {
                        modPlaceholders.push(ph);
                    }
                    if (!scannedPlaceholders.includes(ph)) {
                        scannedPlaceholders.push(ph);
                    }
                }
            }
        }

        extractForMod(mod.content_template);
        extractForMod(mod.content_template_es);

        mod.subsections.forEach(sub => {
            const subCheck = document.getElementById(`sub_${sub.id}`);
            if (subCheck && subCheck.checked) {
                extractForMod(sub.content_template);
                extractForMod(sub.content_template_es);
            }
        });

        if (modPlaceholders.length > 0) {
            modPlaceholders.sort();
            placeholdersByModule[modId] = modPlaceholders;
            modulesWithPlaceholders.push(modId);

            // Populate default values
            modPlaceholders.forEach(ph => {
                if (!customFieldValues[ph]) {
                    const defValObj = defaultBilingualValues[ph] || { en: "", es: "" };
                    customFieldValues[ph] = {
                        en: [defValObj.en],
                        es: [defValObj.es || defValObj.en]
                    };
                }
            });
        }
    });
}

function extractRegexMatches(text, reserved) {
    if (!text) return;
    const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const ph = match[1];
        if (!reserved.includes(ph) && !scannedPlaceholders.includes(ph)) {
            scannedPlaceholders.push(ph);
        }
    }
}

// Default Bilingual Values Mapping for scanned placeholders
const defaultBilingualValues = {
    "wvpp_initiation_date": {
        "en": "July 1, 2024",
        "es": "1 de julio de 2024"
    },
    "wvpp_last_review_date": {
        "en": "PENDING",
        "es": "PENDIENTE"
    },
    "wvpp_administrator_name": {
        "en": "Alex Joo",
        "es": "Alex Joo"
    },
    "wvpp_administrator_title": {
        "en": "General Manager",
        "es": "Gerente General"
    },
    "wvpp_administrator_phone": {
        "en": "760-420-9118",
        "es": "760-420-9118"
    },
    "wvpp_administrator_email": {
        "en": "alexanderjoo69@yahoo.com",
        "es": "alexanderjoo69@yahoo.com"
    },
    "wvpp_assistant_name": {
        "en": "Efren Vital",
        "es": "Efren Vital"
    },
    "wvpp_assistant_title": {
        "en": "Operations",
        "es": "Operaciones"
    },
    "eap_version": {
        "en": "1.0",
        "es": "1.0"
    },
    "eap_date": {
        "en": "4/30/2026",
        "es": "4/30/2026"
    },
    "wvpp_assistant_phone": {
        "en": "760-500-0209",
        "es": "760-500-0209"
    },
    "wvpp_assistant_email": {
        "en": "jhbglobal@yahoo.com",
        "es": "jhbglobal@yahoo.com"
    },
    "wvpp_suggestion_box_location": {
        "en": "Employee Lunchroom",
        "es": "Comedor de Empleados"
    },
    "safety_officer_title": {
        "en": "Program Manager",
        "es": "Gerente de Programa"
    },
    "client_phone": {
        "en": "(760) 370-5100",
        "es": "(760) 370-5100"
    },
    "eap_program_name": {
        "en": "Weatherization Program",
        "es": "Programa de Climatización"
    },
    "eap_office_staging_area": {
        "en": "Southeast portion of the front parking lot at 1005 'C' Street",
        "es": "Parte sureste del estacionamiento delantero en 1005 'C' Street"
    },
    "eap_field_staging_area": {
        "en": "Safe distance from residence (minimum 50–100 feet)",
        "es": "Distancia segura de la residencia (mínimo 50–100 pies)"
    },
    "hospital_name": {
        "en": "Pioneers Memorial Hospital",
        "es": "Pioneers Memorial Hospital"
    },
    "hospital_phone": {
        "en": "(760) 351-3130",
        "es": "(760) 351-3130"
    },
    "hospital_address": {
        "en": "207 W. Legion Road, Brawley, CA 92227",
        "es": "207 W. Legion Road, Brawley, CA 92227"
    },
    "fire_dept_non_emergency_phone": {
        "en": "(760) 344-2111",
        "es": "(760) 344-2111"
    },
    "dtsc_phone": {
        "en": "(916) 322-5660",
        "es": "(916) 322-5660"
    },
    "water_replenishment_system": {
        "en": "coolers replenished from certified filtration wells",
        "es": "enfriadores reabastecidos de pozos de filtración certificados"
    },
    "high_heat_shade_location": {
        "en": "portable mobile canopy tents",
        "es": "carpas de dosel móviles portátiles"
    },
    "anonymous_report_channel": {
        "en": "safety drop box located in main breakroom",
        "es": "buzón de seguridad ubicado en la sala de descanso principal"
    },
    "wvpp_inspection_frequency": {
        "en": "at least annually, and more frequently if situations require",
        "es": "al menos anualmente, y más frecuentemente si las situaciones lo requieren"
    },
    "assembly_point": {
        "en": "the main office parking lot fence area",
        "es": "el área de la cerca del estacionamiento de la oficina principal"
    },
    "utility_shutdown_person": {
        "en": "Supervising Field Foreman",
        "es": "Capataz de Campo Supervisor"
    },
    "local_non_emergency_phone": {
        "en": "(661) 721-3300",
        "es": "(661) 721-3300"
    },
    "pesticide_ppe_locker_location": {
        "en": "Chemical Mixing Shed Locker A",
        "es": "Casillero A del cobertizo de mezcla de químicos"
    },
    "pesticide_first_aid_kit_location": {
        "en": "pesticide handler vehicle storage box",
        "es": "caja de almacenamiento del vehículo del manejador de pesticidas"
    },
    "pesticide_log_keeper": {
        "en": "Designated Safety Officer",
        "es": "Oficial de Seguridad Designado"
    },
    "fit_test_provider": {
        "en": "Apex Occupational Health Services Solutions",
        "es": "Soluciones de Servicios de Salud Ocupacional Apex"
    },
    "medical_clearance_keeper": {
        "en": "Human Resources Manager",
        "es": "Gerente de Recursos Humanos"
    },
    "respirator_filter_location": {
        "en": "Central Safety Supply Cabinet",
        "es": "Gabinete central de suministros de seguridad"
    },
    "facility_cers_id": {
        "en": "10984729",
        "es": "10984729"
    },
    "spill_kit_location": {
        "en": "hazmat containment bunker wall mount",
        "es": "montaje en pared del búnker de contención de materiales peligrosos"
    },
    "cupa_contact_number": {
        "en": "(661) 862-8700",
        "es": "(661) 862-8700"
    },
    "safety_officer_phone": {
        "en": "760-457-5980",
        "es": "760-457-5980"
    },
    "indoor_evaluation_county": {
        "en": "Imperial County",
        "es": "Condado de Imperial"
    },
    "pesticide_sds_location": {
        "en": "company shop and/or main office",
        "es": "taller de la empresa y/u oficina principal"
    },
    "agricultural_commissioner_phone": {
        "en": "442-265-1500",
        "es": "442-265-1500"
    },
    "pesticide_training_date": {
        "en": "03/27/2026",
        "es": "03/27/2026"
    },
    "respirator_program_administrator": {
        "en": "Katia McLaughlin",
        "es": "Katia McLaughlin"
    },
    "respirator_maintenance_location": {
        "en": "4230 White Lilac Rd., Fallbrook, CA 92028",
        "es": "4230 White Lilac Rd., Fallbrook, CA 92028"
    },
    "respirator_medical_provider": {
        "en": "Mission Family Care",
        "es": "Mission Family Care"
    },
    "respirator_medical_provider_address": {
        "en": "706 S. Main Ave., Fallbrook, CA",
        "es": "706 S. Main Ave., Fallbrook, CA"
    },
    "respirator_medical_provider_phone": {
        "en": "(760) 451-3500",
        "es": "(760) 451-3500"
    },
    "respirator_authorized_employee": {
        "en": "Angel Rodriguez",
        "es": "Angel Rodriguez"
    },
    "respirator_authorized_model": {
        "en": "3M 6200/07025, Medium",
        "es": "3M 6200/07025, Mediano"
    },
    "respirator_authorized_clearance_date": {
        "en": "04-04-22",
        "es": "04-04-22"
    },
    "respirator_authorized_fit_test_date": {
        "en": "04-25-22",
        "es": "04-25-22"
    }
};

// Render dynamic fields for Custom Placeholders of the CURRENT sub-step module
function renderPlaceholderInputs() {
    wizard.placeholdersGrid.innerHTML = '';
    
    if (modulesWithPlaceholders.length === 0) {
        wizard.noPlaceholdersState.classList.remove('hidden');
        wizard.placeholdersGrid.style.display = 'none';
        
        const titleEl = document.querySelector('#stepSection3 .step-section-title');
        const descEl = document.querySelector('#stepSection3 .step-section-desc');
        if (titleEl) titleEl.textContent = `Step 3: Verification & Template Customization`;
        if (descEl) descEl.textContent = `The generator scanned your selected safety modules and found no custom variables.`;
        return;
    }

    wizard.noPlaceholdersState.classList.add('hidden');
    wizard.placeholdersGrid.style.display = 'grid';

    const activeModId = modulesWithPlaceholders[customFieldsSubStep];
    const activeMod = dbModules.find(m => m.id === activeModId);
    const placeholdersToRender = placeholdersByModule[activeModId] || [];

    // Update Step 3 header description dynamically
    const titleEl = document.querySelector('#stepSection3 .step-section-title');
    const descEl = document.querySelector('#stepSection3 .step-section-desc');
    if (titleEl && activeMod) {
        titleEl.textContent = `Step 3: Custom Fields for ${activeMod.name} (${activeMod.abbreviation})`;
    }
    if (descEl && activeMod) {
        descEl.textContent = `Configure the custom variables for the ${activeMod.name} safety program (Page ${customFieldsSubStep + 1} of ${modulesWithPlaceholders.length}).`;
    }

    const showSpanish = wizard.includeSpanish.checked;

    placeholdersToRender.forEach(ph => {
        const card = document.createElement('div');
        card.className = 'placeholder-input-card';
        card.id = `ph_card_${ph}`;

        const friendlyName = ph.replace(/_/g, ' ')
                               .replace(/\b\w/g, c => c.toUpperCase());

        const savedVals = customFieldValues[ph] || { en: [], es: [] };
        const valsEN = savedVals.en && savedVals.en.length > 0 ? savedVals.en : [""];
        const valsES = savedVals.es && savedVals.es.length > 0 ? savedVals.es : [""];

        let langGroupsHtml = `
            <div class="repeater-language-group">
                <span class="language-group-label">English Value(s)</span>
                <div class="repeater-list" id="list_${ph}_en">
                    ${valsEN.map(val => `
                        <div class="repeater-item">
                            <input type="text" class="input-field placeholder-user-input" data-ph="${ph}" data-lang="en" value="${val}" placeholder="Enter English details..." required>
                            <button type="button" class="btn-repeater-delete" onclick="removeRepeaterRow(this)" aria-label="Delete value">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <button type="button" class="btn-repeater-add" onclick="addRepeaterRow('${ph}', 'en', '')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add English Value
                </button>
            </div>
        `;

        if (showSpanish) {
            langGroupsHtml += `
                <div class="repeater-language-group spanish-group" style="margin-top: 1.25rem; border-top: 1px dashed var(--border-color); padding-top: 1.25rem;">
                    <span class="language-group-label" style="color: var(--accent-purple);">Spanish Value(s) (Valores en Español)</span>
                    <div class="repeater-list" id="list_${ph}_es">
                        ${valsES.map(val => `
                            <div class="repeater-item">
                                <input type="text" class="input-field placeholder-user-input" data-ph="${ph}" data-lang="es" value="${val}" placeholder="Ingrese detalles en español..." required>
                                <button type="button" class="btn-repeater-delete" onclick="removeRepeaterRow(this)" aria-label="Delete value">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button type="button" class="btn-repeater-add" onclick="addRepeaterRow('${ph}', 'es', '')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Spanish Value
                    </button>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">${friendlyName}</label>
                ${langGroupsHtml}
            </div>
        `;
        wizard.placeholdersGrid.appendChild(card);
    });
}

window.addRepeaterRow = function(ph, lang, value) {
    const list = document.getElementById(`list_${ph}_${lang}`);
    if (!list) return;

    const item = document.createElement('div');
    item.className = 'repeater-item';
    const placeholderText = lang === 'en' ? 'Enter English details...' : 'Ingrese detalles en español...';
    item.innerHTML = `
        <input type="text" class="input-field placeholder-user-input" data-ph="${ph}" data-lang="${lang}" value="${value}" placeholder="${placeholderText}" required>
        <button type="button" class="btn-repeater-delete" onclick="removeRepeaterRow(this)" aria-label="Delete value">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
    `;
    list.appendChild(item);
};

window.removeRepeaterRow = function(btn) {
    const item = btn.closest('.repeater-item');
    const list = item.parentElement;
    if (list.querySelectorAll('.repeater-item').length > 1) {
        item.remove();
    } else {
        alert("At least one value is required for this list.");
    }
};

// Document Compilation Engine
function compileSafetyPlan() {
    const isSpanishChecked = wizard.includeSpanish.checked;

    // 1. Gather all replacements maps (English / Spanish lists)
    const replacementsEN = {
        "client_name": wizard.clientName.value.trim(),
        "company_name": wizard.clientName.value.trim(),
        "client_address": wizard.clientAddress.value.trim(),
        "safety_officer": wizard.safetyOfficer.value.trim(),
        "effective_date": formatDateString(wizard.planDate.value)
    };

    const replacementsES = {
        "client_name": wizard.clientName.value.trim(),
        "company_name": wizard.clientName.value.trim(),
        "client_address": wizard.clientAddress.value.trim(),
        "safety_officer": wizard.safetyOfficer.value.trim(),
        "effective_date": formatDateStringES(wizard.planDate.value)
    };

    // First, save the current step's inputs to customFieldValues before compiling
    saveCurrentCustomFieldValues();

    // Gather step 3 inputs from state
    scannedPlaceholders.forEach(ph => {
        const savedVal = customFieldValues[ph] || { en: [], es: [] };
        
        const inputsEN = (savedVal.en || [])
                            .map(val => val.trim())
                            .filter(val => val !== "");

        const inputsES = isSpanishChecked 
                            ? (savedVal.es || [])
                                .map(val => val.trim())
                                .filter(val => val !== "")
                            : [...inputsEN];

        let joinedEN = "";
        let joinedES = "";

        if (inputsEN.length === 0) {
            joinedEN = `[MISSING ${ph.toUpperCase()}]`;
        } else if (inputsEN.length === 1) {
            joinedEN = inputsEN[0];
        } else if (inputsEN.length === 2) {
            joinedEN = `${inputsEN[0]} and ${inputsEN[1]}`;
        } else {
            const arrEN = [...inputsEN];
            const lastEN = arrEN.pop();
            joinedEN = `${arrEN.join(', ')}, and ${lastEN}`;
        }

        const targetInputsES = inputsES.length > 0 ? inputsES : inputsEN;
        if (targetInputsES.length === 0) {
            joinedES = `[FALTA ${ph.toUpperCase()}]`;
        } else if (targetInputsES.length === 1) {
            joinedES = targetInputsES[0];
        } else if (targetInputsES.length === 2) {
            joinedES = `${targetInputsES[0]} y ${targetInputsES[1]}`;
        } else {
            const arrES = [...targetInputsES];
            const lastES = arrES.pop();
            joinedES = `${arrES.join(', ')} y ${lastES}`;
        }

        replacementsEN[ph] = joinedEN;
        replacementsES[ph] = joinedES;
    });

    // Helper functions to inject values
    function injectEN(templateText) {
        if (!templateText) return "";
        let result = templateText;
        Object.keys(replacementsEN).forEach(key => {
            const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
            result = result.replace(regex, replacementsEN[key]);
        });
        return result;
    }

    function injectES(templateText) {
        if (!templateText) return "";
        let result = templateText;
        Object.keys(replacementsES).forEach(key => {
            const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
            result = result.replace(regex, replacementsES[key]);
        });
        return result;
    }

    // 2. Decide Titles based on checkedModules count (Standalone mode check)
    const checkedModules = Array.from(document.querySelectorAll('.main-module-checkbox:checked')).map(cb => cb.value);
    
    let docTitleEN = "CALIFORNIA OCCUPATIONAL SAFETY BINDER";
    let docSubEN = "Cal/OSHA Compliant Safety Programs";
    let docTitleES = "CARPETA DE SEGURIDAD OCUPACIONAL DE CALIFORNIA";
    let docSubES = "Programas de Seguridad en Cumplimiento con Cal/OSHA";

    if (checkedModules.length === 1) {
        const singleMod = dbModules.find(m => m.id === checkedModules[0]);
        if (singleMod) {
            docTitleEN = singleMod.name.toUpperCase();
            docSubEN = `Cal/OSHA Compliant Safety Program (${singleMod.abbreviation})`;
            
            const ES_TITLES = {
                "iipp": "PROGRAMA DE PREVENCIÓN DE LESIONES Y ENFERMEDADES",
                "hipp": "PLAN DE PREVENCIÓN DE ENFERMEDADES POR CALOR",
                "wvpp": "PLAN DE PREVENCIÓN DE VIOLENCIA EN EL LUGAR DE TRABAJO",
                "epp": "PLAN DE ACCIÓN DE EMERGENCIA",
                "php": "PROGRAMA DE SEGURIDAD PARA MANEJADORES DE PESTICIDAS",
                "rup": "PROGRAMA DE PROTECCIÓN RESPIRATORIA",
                "hmbp": "PLAN DE NEGOCIOS DE MATERIALES PELIGROSOS"
            };
            docTitleES = ES_TITLES[singleMod.id] || singleMod.name.toUpperCase();
            docSubES = `Programa de Seguridad en Cumplimiento con Cal/OSHA (${singleMod.abbreviation})`;
        }
    }

    // 3. Compile English Document Layout
    let documentHtml = `
        <div class="english-plan-section">
            <div style="text-align: center; margin-bottom: 50px; padding-top: 40px;">
                <h1 style="font-size: 2.5rem; margin-bottom: 10px; border-bottom: none; padding-bottom: 0;">${docTitleEN}</h1>
                <div style="font-size: 1.25rem; font-weight: 600; color: #475569; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 40px;">${docSubEN}</div>
                
                <div style="margin: 80px 0; border: 4px double var(--slate-border); padding: 40px 20px;">
                    <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 15px;">${replacementsEN['client_name']}</div>
                    <div style="font-size: 1.1rem; color: #475569;">${replacementsEN['client_address']}</div>
                </div>
                
                <div style="margin-top: 100px; text-align: left; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 2;">
                    <div><strong>Effective Date:</strong> ${replacementsEN['effective_date']}</div>
                    <div><strong>Designated Safety Officer:</strong> ${replacementsEN['safety_officer']}</div>
                    <div><strong>Prepared By:</strong> Ruiz & Associates Safety Department</div>
                </div>
            </div>
            <div class="print-page-break"></div>
            <hr class="plan-page-divider">
    `;

    checkedModules.forEach((modId, index) => {
        const mod = dbModules.find(m => m.id === modId);
        if (!mod) return;

        documentHtml += `<div class="safety-program-section" id="section_en_${mod.id}">`;
        documentHtml += injectEN(mod.content_template);

        mod.subsections.forEach(sub => {
            const subCheck = document.getElementById(`sub_${sub.id}`);
            if (subCheck && subCheck.checked) {
                documentHtml += injectEN(sub.content_template);
            }
        });

        // English signature page
        documentHtml += `
            <div class="signature-page">
                <div class="signature-title">${mod.abbreviation} Program Adoption & Agreement</div>
                <p>By signing below, the employer confirms that this safety plan is fully adopted, and the designated officers/supervisors have been authorized to implement its requirements. Employees have been trained and informed on these safety standards.</p>
                <div class="signature-grid">
                    <div>
                        <div class="sig-line">Designated Safety Officer Signature</div>
                        <div class="sig-meta">${replacementsEN['safety_officer']}</div>
                        <div class="sig-meta">Date: ________________________</div>
                    </div>
                    <div>
                        <div class="sig-line">Executive Management / Owner Approval</div>
                        <div class="sig-meta">Authorized Representative</div>
                        <div class="sig-meta">Date: ________________________</div>
                    </div>
                </div>
            </div>
        `;
        documentHtml += `</div>`; // Close module

        if (index < checkedModules.length - 1) {
            documentHtml += `<div class="print-page-break"></div><hr class="plan-page-divider">`;
        }
    });

    documentHtml += `</div>`; // Close English section

    // 4. Compile Spanish Document Layout (If Selected)
    if (isSpanishChecked) {
        documentHtml += `
            <div class="print-page-break"></div>
            <hr class="plan-page-divider">
            <div class="spanish-plan-section">
                <!-- Spanish Section Separator Cover -->
                <div style="text-align: center; margin-bottom: 50px; padding-top: 40px;">
                    <h1 style="font-size: 2.5rem; margin-bottom: 10px; border-bottom: none; padding-bottom: 0;">${docTitleES}</h1>
                    <div style="font-size: 1.25rem; font-weight: 600; color: #475569; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 40px;">${docSubES}</div>
                    
                    <div style="margin: 80px 0; border: 4px double var(--slate-border); padding: 40px 20px;">
                        <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 15px;">${replacementsES['client_name']}</div>
                        <div style="font-size: 1.1rem; color: #475569;">${replacementsES['client_address']}</div>
                    </div>
                    
                    <div style="margin-top: 100px; text-align: left; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 2;">
                        <div><strong>Fecha de Vigencia:</strong> ${replacementsES['effective_date']}</div>
                        <div><strong>Oficial de Seguridad Designado:</strong> ${replacementsES['safety_officer']}</div>
                        <div><strong>Preparado por:</strong> Departamento de Seguridad de Ruiz & Associates</div>
                    </div>
                </div>
                <div class="print-page-break"></div>
                <hr class="plan-page-divider">
        `;

        checkedModules.forEach((modId, index) => {
            const mod = dbModules.find(m => m.id === modId);
            if (!mod) return;

            documentHtml += `<div class="safety-program-section" id="section_es_${mod.id}">`;
            documentHtml += injectES(mod.content_template_es || mod.content_template);

            mod.subsections.forEach(sub => {
                const subCheck = document.getElementById(`sub_${sub.id}`);
                if (subCheck && subCheck.checked) {
                    documentHtml += injectES(sub.content_template_es || sub.content_template);
                }
            });

            // Spanish signature page
            documentHtml += `
                <div class="signature-page">
                    <div class="signature-title">Acuerdo y Adopción del Programa ${mod.abbreviation}</div>
                    <p>Al firmar a continuación, el empleador confirma que este plan de seguridad se adopta plenamente y que los oficiales/supervisores designados han sido autorizados para implementar sus requisitos. Los empleados han sido capacitados e informados sobre estas normas de seguridad.</p>
                    <div class="signature-grid">
                        <div>
                            <div class="sig-line">Firma del Oficial de Seguridad Designado</div>
                            <div class="sig-meta">${replacementsES['safety_officer']}</div>
                            <div class="sig-meta">Fecha: ________________________</div>
                        </div>
                        <div>
                            <div class="sig-line">Aprobación de la Dirección Ejecutiva / Propietario</div>
                            <div class="sig-meta">Representante Autorizado</div>
                            <div class="sig-meta">Fecha: ________________________</div>
                        </div>
                    </div>
                </div>
            `;
            documentHtml += `</div>`; // Close module

            if (index < checkedModules.length - 1) {
                documentHtml += `<div class="print-page-break"></div><hr class="plan-page-divider">`;
            }
        });

        documentHtml += `</div>`; // Close Spanish section
    }

    wizard.previewPane.innerHTML = documentHtml;
}

function formatDateString(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
}

function formatDateStringES(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// PDF Export Handler
function exportToPdf() {
    const clientName = wizard.clientName.value.trim() || "Client";
    const element = wizard.previewPane;
    const opt = {
        margin:       [0.75, 0.75, 0.75, 0.75],
        filename:     `${clientName.replace(/\s+/g, '_')}_Safety_Plan.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'], before: '.print-page-break' }
    };
    
    alert("Compiling safety plan document layout into PDF format. Your download will start automatically in a few seconds.");
    html2pdf().set(opt).from(element).save().catch(err => {
        console.error("PDF generation error:", err);
        alert("Failed to render PDF in the browser. Please use the browser Print function.");
    });
}

// Word Export (.doc) Handler compatible with MS Word opens
function exportToWord() {
    const clientName = wizard.clientName.value.trim() || "Client";
    
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
          "xmlns:w='urn:schemas-microsoft-com:office:word' " +
          "xmlns='http://www.w3.org/TR/REC-html40'>" +
          "<head><title>Safety Plan Binder - Ruiz & Associates</title>" +
          "<!--[if gte mso 9]><xml>" +
          "<w:WordDocument>" +
          "<w:View>Print</w:View>" +
          "<w:Zoom>100</w:Zoom>" +
          "<w:DoNotOptimizeForBrowser/>" +
          "</w:WordDocument>" +
          "</xml><![endif]-->" +
          "<style>" +
          "body { font-family: 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; padding: 20pt; }" +
          "h1 { font-size: 22pt; font-weight: bold; border-bottom: 3px solid #eab308; padding-bottom: 6pt; margin-top: 18pt; margin-bottom: 12pt; text-transform: uppercase; color: #0f172a; page-break-before: always; }" +
          "h2 { font-size: 14pt; font-weight: bold; border-bottom: 1px solid #cbd5e1; padding-bottom: 4pt; margin-top: 16pt; margin-bottom: 8pt; color: #1e293b; }" +
          "h3 { font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; color: #334155; }" +
          "p { margin-bottom: 10pt; color: #475569; }" +
          "ul, ol { margin-bottom: 12pt; padding-left: 20pt; }" +
          "li { margin-bottom: 4pt; color: #475569; }" +
          ".signature-page { border: 2px dashed #cbd5e1; background: #f8fafc; padding: 20pt; margin-top: 30pt; page-break-inside: avoid; }" +
          ".signature-title { font-weight: bold; font-size: 12pt; text-transform: uppercase; margin-bottom: 10pt; color: #0f172a; }" +
          "</style>" +
          "</head><body>";
    const footer = "</body></html>";
    
    let contentHtml = wizard.previewPane.innerHTML;
    contentHtml = contentHtml.replace(/<hr class="plan-page-divider">/g, "");
    
    // Structure signature grids for Word Table layout mapping (Microsoft Word table fallback)
    contentHtml = contentHtml.replace(/<div class="signature-grid">([\s\S]*?)<\/div>/g, (match, inner) => {
        const blocks = inner.split(/<div[\s\S]*?>/g).filter(b => b.trim() !== "");
        let col1 = blocks[0] ? blocks[0].replace(/<\/div>/g, "") : "";
        let col2 = blocks[1] ? blocks[1].replace(/<\/div>/g, "") : "";
        
        return `
        <table style="width: 100%; margin-top: 20pt;" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td style="width: 50%; padding-right: 20pt; vertical-align: top;">${col1}</td>
                <td style="width: 50%; padding-left: 20pt; vertical-align: top;">${col2}</td>
            </tr>
        </table>`;
    });

    const sourceHTML = header + contentHtml + footer;

    // Convert to Blob and download
    const blob = new Blob(['\ufeff' + sourceHTML], {
        type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${clientName.replace(/\s+/g, '_')}_Safety_Plan.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Save Plan to Firebase Firestore
async function savePlanToCloud() {
    const clientName = wizard.clientName.value.trim();
    const safetyOfficer = wizard.safetyOfficer.value.trim();
    const effectiveDate = wizard.planDate.value;
    const selectedInd = document.querySelector('input[name="industry"]:checked').value;
    const includeSpanish = wizard.includeSpanish.checked;
    
    const modulesIncluded = [];
    document.querySelectorAll('.main-module-checkbox:checked').forEach(modCb => {
        const modId = modCb.value;
        const subIds = [];
        const card = document.getElementById(`card_${modId}`);
        card.querySelectorAll('.sub-checkbox:checked').forEach(subCb => {
            subIds.push(subCb.value);
        });
        modulesIncluded.push({
            module_id: modId,
            subsections: subIds
        });
    });

    const planData = {
        client_name: clientName,
        industry_id: selectedInd,
        safety_officer: safetyOfficer,
        date_generated: effectiveDate,
        modules_included: modulesIncluded,
        compiled_text: wizard.previewPane.innerHTML,
        spanish_translation_included: includeSpanish,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    const clientId = wizard.selectClient.value;
    if (clientId) {
        planData.client_id = clientId;
    }

    try {
        await db.collection("compiled_plans").add(planData);
        alert("Success! The safety plan configuration and compiled text have been successfully saved to Ruiz & Associates' database.");
    } catch (err) {
        console.error("Error saving plan to cloud:", err);
        alert("Error saving compiled plan to Firestore. See console logs for details.");
    }
}
