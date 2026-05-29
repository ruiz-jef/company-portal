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
<p>The Designated Safety Officer, {{safety_officer}}, has the authority and responsibility for implementing and maintaining this IIPP at {{client_name}}. Managers and supervisors are responsible for enforcing safety rules, conducting training, and ensuring employee compliance. Every employee is responsible for working safely and reporting hazards immediately.</p>`,
                content_template_es: `<h2>1. Responsabilidad</h2>
<p>El Oficial de Seguridad Designado, {{safety_officer}}, tiene la autoridad y la responsabilidad de implementar y mantener este IIPP en {{client_name}}. Los gerentes y supervisores son responsables de hacer cumplir las normas de seguridad, llevar a cabo capacitaciones y asegurar el cumplimiento de los empleados. Cada empleado es responsable de trabajar de manera segura y reportar los peligros de inmediato.</p>`
            },
            {
                id: "iipp_comp",
                title: "Safety Compliance Procedures / Cumplimiento",
                content_template: `<h2>2. Compliance</h2>
<p>Management is committed to ensuring that all safety policies are followed. Employee compliance is reinforced through: training programs, recognition of safe work practices, and, when necessary, progressive disciplinary procedures (from verbal warnings to suspension or discharge).</p>`,
                content_template_es: `<h2>2. Cumplimiento</h2>
<p>La gerencia se compromete a garantizar que se sigan todas las políticas de seguridad. El cumplimiento de los empleados se refuerza a través de: programas de capacitación, reconocimiento de prácticas de trabajo seguras y, cuando sea necesario, procedimientos disciplinarios progresivos (desde advertencias verbales hasta la suspensión o el despido).</p>`
            },
            {
                id: "iipp_comm",
                title: "Communication System / Comunicación",
                content_template: `<h2>3. Communication</h2>
<p>{{client_name}} enforces a multi-channel communication system, allowing employee feedback regarding hazards. Communication methods include: tailgate safety meetings, training sessions, anonymous hazard reporting forms, and direct access to {{safety_officer}}.</p>`,
                content_template_es: `<h2>3. Comunicación</h2>
<p>{{client_name}} aplica un sistema de comunicación de múltiples canales que permite a los empleados enviar comentarios sobre los peligros. Los métodos de comunicación incluyen: reuniones de seguridad (tailgate), sesiones de capacitación, formularios de reporte de peligros anónimos y acceso directo a {{safety_officer}}.</p>`
            },
            {
                id: "iipp_inspections",
                title: "Hazard Identification & Inspections / Inspecciones",
                content_template: `<h2>4. Hazard Identification & Inspections</h2>
<p>Periodic inspections are scheduled to identify and evaluate workplace hazards. Inspection schedules are managed under the guidance of {{safety_officer}}. Inspections will occur at least monthly, when new substances, processes, or equipment are introduced, and when new hazards are reported.</p>`,
                content_template_es: `<h2>4. Identificación de Peligros e Inspecciones</h2>
<p>Se programan inspecciones periódicas para identificar y evaluar los peligros en el lugar de trabajo. Las programaciones de inspección se gestionan bajo la guía de {{safety_officer}}. Las inspecciones se realizarán al menos mensualmente, cuando se introduzcan nuevas sustancias, procesos o equipos, y cuando se reporten nuevos peligros.</p>`
            },
            {
                id: "iipp_investigation",
                title: "Accident Investigation / Investigación de Accidentes",
                content_template: `<h2>5. Accident & Exposure Investigation</h2>
<p>Procedures for investigating workplace accidents, injuries, or illnesses include: visiting the scene as soon as possible, interviewing witnesses, determining the root cause, and documenting findings. {{safety_officer}} will compile investigation reports and implement corrective actions.</p>`,
                content_template_es: `<h2>5. Investigación de Accidentes y Exposición</h2>
<p>Los procedimientos para investigar accidentes, lesiones o enfermedades en el lugar de trabajo incluyen: visitar la escena lo antes posible, entrevistar a los testigos, determinar la causa raíz y documentar los hallazgos. {{safety_officer}} recopilará los informes de investigación e implementará acciones correctivas.</p>`
            },
            {
                id: "iipp_correction",
                title: "Hazard Correction / Corrección de Peligros",
                content_template: `<h2>6. Hazard Correction</h2>
<p>Unsafe or unhealthy work conditions, practices, or procedures shall be corrected in a timely manner based on the severity of the hazard. If an imminent hazard exists, operations will cease in the affected area, and only trained personnel will be permitted inside to correct the condition.</p>`,
                content_template_es: `<h2>6. Corrección de Peligros</h2>
<p>Las condiciones, prácticas o procedimientos de trabajo unsafe o insalubres se corregirán de manera oportuna según la gravedad del peligro. Si existe un peligro inminente, las operaciones cesarán en el área afectada y solo se permitirá el ingreso de personal capacitado para corregir la condición.</p>`
            }
        ]
    },
    {
        id: "hipp",
        name: "Heat Illness Prevention Plan",
        abbreviation: "HIPP",
        content_template: `<h1>Heat Illness Prevention Plan (HIPP)</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Effective Date:</strong> {{effective_date}}</p>
<p><strong>Safety Coordinator:</strong> {{safety_officer}}</p>
<p>This HIPP complies with Cal/OSHA Title 8, Section 3395 for outdoor employment. This program applies to all outdoor work activities at {{client_name}} where environmental risk factors for heat illness are present. Under the direction of {{safety_officer}}, measures are established to provide water, shade, and rest breaks.</p>`,
        content_template_es: `<h1>Plan de Prevención de Enfermedades por Calor (HIPP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<p><strong>Coordinador de Seguridad:</strong> {{safety_officer}}</p>
<p>Este HIPP cumple con la norma de Cal/OSHA Título 8, Sección 3395 para el empleo al aire libre. Este programa se aplica a todas las actividades de trabajo al aire libre en {{client_name}} donde existan factores de riesgo ambiental de enfermedad por calor. Bajo la dirección de {{safety_officer}}, se establecen medidas para proporcionar agua, sombra y descansos.</p>`,
        subsections: [
            {
                id: "hipp_water",
                title: "Provision of Water / Suministro de Agua",
                content_template: `<h2>1. Provision of Water</h2>
<p>Employees shall have access to fresh, pure, suitably cool drinking water free of charge. Water shall be located as close as practicable to the areas where employees are working, with at least one quart per employee per hour provided for the entire shift. {{client_name}} utilizes {{water_replenishment_system}} to ensure water supplies do not run dry.</p>`,
                content_template_es: `<h2>1. Suministro de Agua</h2>
<p>Los empleados tendrán acceso a agua potable fresca, pura y adecuadamente fría de forma gratuita. El agua se ubicará lo más cerca posible de las áreas donde trabajan los empleados, proporcionando al menos un cuarto de galón de agua por empleado por hora durante todo el turno. {{client_name}} utiliza el sistema {{water_replenishment_system}} para garantizar que el suministro de agua no se agote.</p>`
            },
            {
                id: "hipp_shade",
                title: "Access to Shade & Cool Down / Acceso a Sombra",
                content_template: `<h2>2. Access to Shade</h2>
<p>Shade shall be present when the outdoor temperature in the work area exceeds 80 degrees Fahrenheit. The shade structures must be located as close as practicable to workers. Employees are encouraged to take a preventative cool-down rest in the shade for a period of no less than five minutes when they feel they need protection from overheating.</p>`,
                content_template_es: `<h2>2. Acceso a Sombra</h2>
<p>Habrá sombra cuando la temperatura exterior en el área de trabajo supere los 80 grados Fahrenheit. Las estructuras de sombra deben ubicarse lo más cerca posible de los trabajadores. Se anima a los empleados a tomar un descanso preventivo de enfriamiento a la sombra por un período no menor a cinco minutos cuando sientan que necesitan protección contra el sobrecalentamiento.</p>`
            },
            {
                id: "hipp_highheat",
                title: "High-Heat Procedures / Calor Extremo",
                content_template: `<h2>3. High-Heat Procedures</h2>
<p>High-heat procedures are triggered when the outdoor temperature reaches or exceeds 95 degrees Fahrenheit. At {{client_name}}, high-heat procedures will include: buddy systems, regular radio communication checks, observation of employees for signs of heat illness, and mandatory rest periods. We establish designated cooling zones at {{high_heat_shade_location}}.</p>`,
                content_template_es: `<h2>3. Procedimientos para Calor Extremo</h2>
<p>Los procedimientos para calor extremo se activan cuando la temperatura exterior alcanza o supera los 95 grados Fahrenheit. En {{client_name}}, los procedimientos para calor extremo incluirán: sistemas de compañeros (buddy system), controles regulares de comunicación por radio, observación de empleados en busca de signos de enfermedad por calor y descansos obligatorios. Establecemos zonas de enfriamiento designadas en {{high_heat_shade_location}}.</p>`
            },
            {
                id: "hipp_emergency",
                title: "Emergency Response / Respuesta de Emergencia",
                content_template: `<h2>4. Emergency Response Procedures</h2>
<p>If an employee shows symptoms of heat illness (such as dizziness, nausea, headache, muscle cramps, or confusion), supervisors must take immediate action. This includes moving the employee to shade, cooling them down, and calling 911 if symptoms are severe. Clear directions to the worksite: {{emergency_directions_to_site}} must be provided to emergency services.</p>`,
                content_template_es: `<h2>4. Procedimientos de Respuesta de Emergencia</h2>
<p>Si un empleado muestra síntomas de enfermedad por calor (como mareos, náuseas, dolor de cabeza, calambres musculares o confusión), los supervisores deben tomar medidas inmediatas. Esto incluye trasladar al empleado a la sombra, enfriarlo y llamar al 911 si los síntomas son graves. Se deben proporcionar instrucciones claras para llegar al lugar de trabajo: {{emergency_directions_to_site}} a los servicios de emergencia.</p>`
            }
        ]
    },
    {
        id: "wvpp",
        name: "Workplace Violence Prevention Plan",
        abbreviation: "WVPP",
        content_template: `<h1>Workplace Violence Prevention Plan (WVPP)</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Effective Date:</strong> {{effective_date}}</p>
<p><strong>Designated Administrator:</strong> {{safety_officer}}</p>
<p>This program is established in compliance with California Senate Bill 553 (Labor Code Section 6401.9), requiring California employers to implement a Workplace Violence Prevention Plan. {{client_name}} has a zero-tolerance policy for workplace violence, including threats, harassment, intimidation, and physical assaults at {{client_address}}.</p>`,
        content_template_es: `<h1>Plan de Prevención de Violencia en el Lugar de Trabajo (WVPP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<p><strong>Administrador Designado:</strong> {{safety_officer}}</p>
<p>Este programa se establece de conformidad con el Proyecto de Ley del Senado de California 553 (Sección 6401.9 del Código de Trabajo), que exige a los empleadores de California implementar un Plan de Prevención de Violencia en el Lugar de Trabajo. {{client_name}} tiene una política de tolerancia cero para la violencia en el lugar de trabajo, incluyendo amenazas, acoso, intimidación y agresiones físicas en {{client_address}}.</p>`,
        subsections: [
            {
                id: "wvpp_roles",
                title: "Roles & Responsibilities / Roles y Responsabilidades",
                content_template: `<h2>1. Roles & Active Involvement</h2>
<p>{{safety_officer}} is responsible for administering this WVPP. Every manager, supervisor, and employee is active in implementing safety protocols. Employees are encouraged to report any concerns without fear of retaliation, utilizing the anonymous report channel at {{anonymous_report_channel}}.</p>`,
                content_template_es: `<h2>1. Funciones e Involucramiento Activo</h2>
<p>{{safety_officer}} es responsable de administrar este WVPP. Cada gerente, supervisor y empleado participa activamente en la implementación de los protocolos de seguridad. Se alienta a los empleados a reportar cualquier inquietud sin temor a represalias, utilizando el canal de reporte anónimo en {{anonymous_report_channel}}.</p>`
            },
            {
                id: "wvpp_hazards",
                title: "Threat Assessment / Evaluación de Amenazas",
                content_template: `<h2>2. Hazard Identification & Evaluation</h2>
<p>Periodic evaluations of workplace threat levels are conducted. This includes looking for environmental hazards (poor lighting, lack of security cameras, cash handling risks) and evaluating any history of employee-on-employee, client-on-employee, or domestic violence spillover. Inspections are conducted {{wvpp_inspection_frequency}}.</p>`,
                content_template_es: `<h2>2. Identificación y Evaluación de Peligros</h2>
<p>Se realizan evaluaciones periódicas de los niveles de amenaza en el lugar de trabajo. Esto incluye la búsqueda de peligros ambientales (iluminación deficiente, falta de cámaras de seguridad, riesgos en el manejo de efectivo) y la evaluación de cualquier antecedente de violencia de empleado a empleado, de cliente a empleado o violencia doméstica que afecte al trabajo. Las inspecciones se realizan {{wvpp_inspection_frequency}}.</p>`
            },
            {
                id: "wvpp_log",
                title: "Incident Logs & Investigation / Registro de Incidentes",
                content_template: `<h2>3. Violent Incident Log</h2>
<p>Every incident of workplace violence, including threats or verbal abuse, must be recorded in the Violent Incident Log. The log will exclude personal identifying information of victims. Investigations will analyze what occurred, what factors contributed, and what security measures need improvement.</p>`,
                content_template_es: `<h2>3. Registro de Incidentes Violentos</h2>
<p>Cada incidente de violencia en el lugar de trabajo, incluidas las amenazas o el abuso verbal, debe registrarse en el Registro de Incidentes Violentos. El registro excluirá la información de identificación personal de las víctimas. Las investigaciones analizarán lo sucedido, qué factores contribuyeron y qué medidas de seguridad deben mejorarse.</p>`
            }
        ]
    },
    {
        id: "epp",
        name: "Emergency Preparedness Plan",
        abbreviation: "EPP",
        content_template: `<h1>Emergency Preparedness & Action Plan (EPP)</h1>
<p><strong>Company Name:</strong> {{client_name}}</p>
<p><strong>Effective Date:</strong> {{effective_date}}</p>
<p>This plan describes actions to take in emergencies (fire, earthquake, toxic release, severe weather) to ensure life safety at {{client_address}}. Under the direction of {{safety_officer}}, evacuation procedures are outlined.</p>`,
        content_template_es: `<h1>Plan de Acción y Preparación para Emergencias (EPP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<p>Este plan describe las acciones a tomar en emergencies (incendios, terremotos, fugas de sustancias tóxicas, clima severo) para garantizar la seguridad de la vida en {{client_address}}. Bajo la dirección de {{safety_officer}}, se detallan los procedimientos de evacuación.</p>`,
        subsections: [
            {
                id: "epp_evac",
                title: "Evacuation Procedures / Evacuación",
                content_template: `<h2>1. Evacuation Routes & Assembly Points</h2>
<p>Evacuation maps are posted at exit points. In an emergency, employees of {{client_name}} must evacuate in an orderly manner and assemble at the designated safety zone: {{assembly_point}}. Supervisors will account for all personnel using rosters.</p>`,
                content_template_es: `<h2>1. Rutas de Evacuación y Puntos de Reunión</h2>
<p>Los mapas de evacuación están publicados en los puntos de salida. En una emergencia, los empleados de {{client_name}} deben evacuar de manera ordenada y reunirse en la zona de seguridad designada: {{assembly_point}}. Los supervisores contabilizarán a todo el personal utilizando listas de asistencia.</p>`
            },
            {
                id: "epp_shutdown",
                title: "Critical Operations / Operaciones Críticas",
                content_template: `<h2>2. Critical Operations</h2>
<p>Before evacuating, designated employees must shut down critical machinery or utilities if safe to do so. The designated employee for utility shutdown is {{utility_shutdown_person}}.</p>`,
                content_template_es: `<h2>2. Operaciones Críticas</h2>
<p>Antes de evacuar, los empleados designados deben apagar la maquinaria o los servicios públicos críticos si es seguro hacerlo. El empleado designado para el corte de servicios públicos es {{utility_shutdown_person}}.</p>`
            },
            {
                id: "epp_contacts",
                title: "Emergency Contacts / Contactos de Emergencia",
                content_template: `<h2>3. Emergency Notification</h2>
<p>In case of emergency, contact the Designated Safety Officer ({{safety_officer}}). Dial 911 immediately for local police, fire, or ambulance. The local non-emergency dispatch number is {{local_non_emergency_phone}}.</p>`,
                content_template_es: `<h2>3. Notificación de Emergencia</h2>
<p>En caso de emergencia, comuníquese con el Oficial de Seguridad Designado ({{safety_officer}}). Llame al 911 de inmediato para la policía local, bomberos o ambulancia. El número de despacho que no es de emergencia local es {{local_non_emergency_phone}}.</p>`
            }
        ]
    },
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
                id: "php_ppe",
                title: "Personal Protective Equipment (PPE) / Equipo de Protección",
                content_template: `<h2>1. Personal Protective Equipment (PPE)</h2>
<p>Handlers must wear appropriate protective clothing (gloves, eye protection, coveralls, chemical resistant boots) as specified by the pesticide product label. The designated PPE locker and changing area is located at {{pesticide_ppe_locker_location}}.</p>`,
                content_template_es: `<h2>1. Equipo de Protección Personal (PPE)</h2>
<p>Los manejadores deben usar la ropa protectora adecuada (guantes, protección ocular, overoles, botas resistentes a químicos) según lo especificado por la etiqueta del producto pesticida. El casillero de PPE y el área de cambio designados se encuentran en {{pesticide_ppe_locker_location}}.</p>`
            },
            {
                id: "php_decon",
                title: "Decontamination & First Aid / Descontaminación",
                content_template: `<h2>2. Decontamination Facilities</h2>
<p>Decontamination sites with clean water (at least 3 gallons per handler), soap, and single-use towels must be maintained within 1/4 mile of mixing, loading, or application sites. Emergency eye-flush kits must be immediately accessible. Emergency first-aid kits are stored in {{pesticide_first_aid_kit_location}}.</p>`,
                content_template_es: `<h2>2. Instalaciones de Descontaminación</h2>
<p>Se deben mantener sitios de descontaminación con agua limpia (al menos 3 galones por manejador), jabón y toallas de un solo uso dentro de 1/4 de milla de los sitios de mezcla, carga o aplicación. Los kits de lavado de ojos de emergencia deben ser accesibles de inmediato. Los kits de primeros auxilios de emergencia se guardan en {{pesticide_first_aid_kit_location}}.</p>`
            },
            {
                id: "php_posting",
                title: "Field Posting & REI / Señalización de Campos",
                content_template: `<h2>3. Field Posting & REI</h2>
<p>Treated fields must be posted with warning signs if required by the label. Employees are strictly prohibited from entering treated areas during the Restricted Entry Interval (REI). The standard REI tracking log is maintained by {{pesticide_log_keeper}}.</p>`,
                content_template_es: `<h2>3. Publicación de Campo y REI</h2>
<p>Los campos tratados deben ser señalizados con letreros de advertencia si la etiqueta lo requiere. Los empleados tienen estrictamente prohibido ingresar a las áreas tratadas durante el Intervalo de Entrada Restringido (REI). El registro estándar de seguimiento de REI es mantenido por {{pesticide_log_keeper}}.</p>`
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
<p><strong>Program Administrator:</strong> {{safety_officer}}</p>
<p>This program is established in compliance with Cal/OSHA Title 8, Section 5144. It covers fit-testing, medical evaluations, and maintenance of respirators. {{client_name}} provides respirators to employees when such equipment is necessary to protect their health against dusts, fumes, mists, or organic vapors.</p>`,
        content_template_es: `<h1>Programa de Protección Respiratoria (RUP)</h1>
<p><strong>Nombre de la Empresa:</strong> {{client_name}}</p>
<p><strong>Fecha de Entrada en Vigor:</strong> {{effective_date}}</p>
<p><strong>Administrador del Programa:</strong> {{safety_officer}}</p>
<p>Este programa se establece de conformidad con la norma de Cal/OSHA Título 8, Sección 5144. Abarca las pruebas de ajuste, evaluaciones médicas y mantenimiento de respiradores. {{client_name}} proporciona respiradores a los empleados cuando dicho equipo es necesario para proteger su salud contra polvos, humos, neblinas o vapores orgánicos.</p>`,
        subsections: [
            {
                id: "rup_fit",
                title: "Fit Testing / Pruebas de Ajuste",
                content_template: `<h2>1. Respirator Selection & Fit Testing</h2>
<p>Annual qualitative or quantitative fit-testing is required for all employees of {{client_name}} assigned to wear tight-fitting respirators. Fit testing is conducted by {{fit_test_provider}}. Only approved respirator types (e.g. half-mask, full-face, N95) may be used.</p>`,
                content_template_es: `<h2>1. Selección de Respirador y Prueba de Ajuste</h2>
<p>Se requieren pruebas de ajuste anuales cualitativas o cuantitativas para todos los empleados de {{client_name}} asignados a usar respiradores de ajuste apretado. Las pruebas de ajuste son realizadas por {{fit_test_provider}}. Solo se pueden usar tipos de respiradores aprobados (por ejemplo, media máscara, cara completa, N95).</p>`
            },
            {
                id: "rup_medical",
                title: "Medical Evaluations / Evaluaciones Médicas",
                content_template: `<h2>2. Medical Evaluations</h2>
<p>Employees must receive medical clearance from a licensed healthcare provider before wearing any respirator. Evaluations are performed using the Cal/OSHA standard medical questionnaire. Clearances are kept on file in the safety office by {{medical_clearance_keeper}}.</p>`,
                content_template_es: `<h2>2. Evaluaciones Médicas</h2>
<p>Los empleados deben recibir autorización médica de un proveedor de atención médica con licencia antes de usar cualquier respirador. Las evaluaciones se realizan utilizando el cuestionario médico estándar de Cal/OSHA. Las autorizaciones se mantienen en archivo en la oficina de seguridad por {{medical_clearance_keeper}}.</p>`
            },
            {
                id: "rup_maintenance",
                title: "Respirator Care / Cuidado de Respiradores",
                content_template: `<h2>3. Cleaning, Maintenance & Storage</h2>
<p>Employees are responsible for inspecting, cleaning, and storing their respirators after each use. Respirators must be stored in a clean, sanitary bag to protect against dust, sunlight, extreme temperatures, and chemical degradation. Replacement filters are available at {{respirator_filter_location}}.</p>`,
                content_template_es: `<h2>3. Limpieza, Mantenimiento y Almacenamiento</h2>
<p>Los empleados son responsables de inspeccionar, limpiar y almacenar sus respiradores después de cada uso. Los respiradores deben almacenarse en una bolsa limpia y sanitaria para protegerlos contra el polvo, la luz solar, las temperaturas extremas y la degradación química. Los filtros de repuesto están disponibles en {{respirator_filter_location}}.</p>`
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
        // 1. Seed database first (handles migration if Spanish properties missing)
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

// Seed relational collections if empty (or missing bilingual fields)
async function seedDatabaseIfNeeded() {
    try {
        const modulesSnap = await db.collection("safety_modules").get();
        let needsModulesSeed = false;
        
        if (modulesSnap.empty) {
            needsModulesSeed = true;
        } else {
            // If existing records do not have 'content_template_es', trigger overwrite migration
            const sample = modulesSnap.docs[0].data();
            if (!sample.content_template_es) {
                needsModulesSeed = true;
                console.log("Old database format detected. Upgrading to bilingual templates...");
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
        if (mod.subsections && mod.subsections.length > 0) {
            subHtml = `
            <div class="module-subsections-body">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.05em;">Sections to Include:</div>
                <div class="subsections-grid">
                    ${mod.subsections.map(sub => `
                        <label class="subsection-item-label" for="sub_${sub.id}">
                            <input type="checkbox" id="sub_${sub.id}" value="${sub.id}" class="sub-checkbox" checked>
                            <span class="subsection-title">${sub.title}</span>
                        </label>
                    `).join('')}
                </div>
            </div>`;
        }

        card.innerHTML = `
            <div class="module-config-header" onclick="toggleCardExpand('${mod.id}')">
                <div class="header-left">
                    <input type="checkbox" id="mod_${mod.id}" value="${mod.id}" class="main-module-checkbox" onchange="toggleModuleCheck('${mod.id}')" onclick="event.stopPropagation();">
                    <span class="module-badge-abbrev">${mod.abbreviation}</span>
                    <span class="module-config-title">${mod.name}</span>
                </div>
                <div class="header-right">
                    <span class="module-status-pill included">Included</span>
                    <span class="module-status-pill excluded">Excluded</span>
                    ${mod.subsections && mod.subsections.length > 0 ? `
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
        
        // Render step 3 inputs with repeaters
        renderPlaceholderInputs();
        
        transitionStep(3);
    } else if (currentStep === 3) {
        // Compile Document layout & print to preview pane
        compileSafetyPlan();
        
        transitionStep(4);
    }
}

function navigatePrev() {
    if (currentStep > 1) {
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
            wizard.btnNext.innerHTML = `Compile Plan <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
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
function scanSelectedModulesForPlaceholders() {
    scannedPlaceholders = [];
    const reserved = ["client_name", "company_name", "client_address", "safety_officer", "effective_date"];
    const checkedModules = Array.from(document.querySelectorAll('.main-module-checkbox:checked')).map(cb => cb.value);

    checkedModules.forEach(modId => {
        const mod = dbModules.find(m => m.id === modId);
        if (!mod) return;

        extractRegexMatches(mod.content_template, reserved);
        extractRegexMatches(mod.content_template_es, reserved);

        mod.subsections.forEach(sub => {
            const subCheck = document.getElementById(`sub_${sub.id}`);
            if (subCheck && subCheck.checked) {
                extractRegexMatches(sub.content_template, reserved);
                extractRegexMatches(sub.content_template_es, reserved);
            }
        });
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

// Render dynamic fields for Custom Placeholders with Add Value repeaters
function renderPlaceholderInputs() {
    wizard.placeholdersGrid.innerHTML = '';
    
    if (scannedPlaceholders.length === 0) {
        wizard.noPlaceholdersState.classList.remove('hidden');
        wizard.placeholdersGrid.style.display = 'none';
        return;
    }

    wizard.noPlaceholdersState.classList.add('hidden');
    wizard.placeholdersGrid.style.display = 'grid';

    scannedPlaceholders.sort();

    scannedPlaceholders.forEach(ph => {
        const card = document.createElement('div');
        card.className = 'placeholder-input-card';
        card.id = `ph_card_${ph}`;

        const friendlyName = ph.replace(/_/g, ' ')
                               .replace(/\b\w/g, c => c.toUpperCase());

        let defaultVal = "";
        if (ph === "water_replenishment_system") defaultVal = "coolers replenished from certified filtration wells";
        if (ph === "high_heat_shade_location") defaultVal = "portable mobile canopy tents";
        if (ph === "anonymous_report_channel") defaultVal = "safety drop box located in main breakroom";
        if (ph === "wvpp_inspection_frequency") defaultVal = "semi-annually in June and December";
        if (ph === "assembly_point") defaultVal = "the main office parking lot fence area";
        if (ph === "utility_shutdown_person") defaultVal = "Supervising Field Foreman";
        if (ph === "local_non_emergency_phone") defaultVal = "(661) 721-3300";
        if (ph === "pesticide_ppe_locker_location") defaultVal = "Chemical Mixing Shed Locker A";
        if (ph === "pesticide_first_aid_kit_location") defaultVal = "pesticide handler vehicle storage box";
        if (ph === "pesticide_log_keeper") defaultVal = "Designated Safety Officer";
        if (ph === "fit_test_provider") defaultVal = "Apex Occupational Health Services Solutions";
        if (ph === "medical_clearance_keeper") defaultVal = "Human Resources Manager";
        if (ph === "respirator_filter_location") defaultVal = "Central Safety Supply Cabinet";
        if (ph === "facility_cers_id") defaultVal = "10984729";
        if (ph === "spill_kit_location") defaultVal = "hazmat containment bunker wall mount";
        if (ph === "cupa_contact_number") defaultVal = "(661) 862-8700";

        card.innerHTML = `
            <span class="placeholder-tag">{{${ph}}}</span>
            <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">${friendlyName}</label>
                <div class="repeater-list" id="list_${ph}">
                    <div class="repeater-item">
                        <input type="text" class="input-field placeholder-user-input" data-ph="${ph}" value="${defaultVal}" placeholder="Enter details..." required>
                        <button type="button" class="btn-repeater-delete" onclick="removeRepeaterRow(this)" aria-label="Delete value">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>
                </div>
                <button type="button" class="btn-repeater-add" onclick="addRepeaterRow('${ph}', '')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Value
                </button>
            </div>
        `;
        wizard.placeholdersGrid.appendChild(card);
    });
}

window.addRepeaterRow = function(ph, value) {
    const list = document.getElementById(`list_${ph}`);
    if (!list) return;

    const item = document.createElement('div');
    item.className = 'repeater-item';
    item.innerHTML = `
        <input type="text" class="input-field placeholder-user-input" data-ph="${ph}" value="${value}" placeholder="Enter details..." required>
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
        alert("At least one value is required for this placeholder.");
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

    // Gather step 3 inputs (grammatical list structures)
    scannedPlaceholders.forEach(ph => {
        const inputs = Array.from(document.querySelectorAll(`input[data-ph="${ph}"]`))
                            .map(inp => inp.value.trim())
                            .filter(val => val !== "");

        let joinedEN = "";
        let joinedES = "";

        if (inputs.length === 0) {
            joinedEN = `[MISSING ${ph.toUpperCase()}]`;
            joinedES = `[FALTA ${ph.toUpperCase()}]`;
        } else if (inputs.length === 1) {
            joinedEN = inputs[0];
            joinedES = inputs[0]; // word-for-word copy
        } else if (inputs.length === 2) {
            joinedEN = `${inputs[0]} and ${inputs[1]}`;
            joinedES = `${inputs[0]} y ${inputs[1]}`;
        } else {
            const arrEN = [...inputs];
            const lastEN = arrEN.pop();
            joinedEN = `${arrEN.join(', ')}, and ${lastEN}`;

            const arrES = [...inputs];
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
                "epp": "PLAN DE PREPARACIÓN PARA EMERGENCIAS",
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
                <div class="signature-title">${mod.abbreviation} Program adoption & Agreement</div>
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
            // Inject Spanish module template
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
    // Format YYYY-MM-DD -> DD/MM/YYYY
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
