import { Metadata } from 'next';
import DocPage from '../../DocPage';
import styles from '../../doc.module.css';

export const metadata: Metadata = {
  title: 'Política de privacidad | Hombre Muerto',
  alternates: { canonical: 'https://pablogarces.dev/docs/policy/hombre-muerto' },
  description:
    'Política de privacidad de Hombre Muerto, la alarma de guardia para el puente de un barco, publicada por Pablo Garces.',
};

export const dynamic = 'force-static';

export default function HombreMuertoPrivacy() {
  return (
    <DocPage appName="Hombre Muerto" title="Política de privacidad" accentColor="#1F9E6A">
      <section>
        <p>Última actualización: 15 de octubre de 2026</p>
        <p>
          <strong>Hombre Muerto</strong> es una alarma de guardia para el puente de un barco, para
          Android (paquete <strong>com.pgarces.hombremuerto</strong>) e iOS, publicada por Pablo
          Garces. Esta política explica qué hace la app con tus datos.
        </p>
        <p>
          <strong>
            La app solo envía a nuestro servidor el código de licencia y un identificador del
            dispositivo, al activar la licencia. No hay cuentas, ni publicidad, ni analítica, ni
            seguimiento.
          </strong>
        </p>
        <p>
          Para cualquier pregunta sobre privacidad, escribe a{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">
            pasebarona@gmail.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>1. Datos que recogemos</h2>
        <h3 className={styles.h3}>Activación de la licencia</h3>
        <p>
          Al activar la app se envían el <strong>código de licencia</strong> y un{' '}
          <strong>identificador del dispositivo</strong> (en Android, el ANDROID_ID; en iOS, el
          identificador de proveedor guardado en el llavero). Sirven para vincular la licencia a un
          teléfono y comprobar que sigue vigente. Se guardan mientras la licencia exista.
        </p>
        <h3 className={styles.h3}>Intentos fallidos</h3>
        <p>
          Si un código no es válido, guardamos la dirección IP y el identificador del dispositivo
          para limitar los intentos repetidos. Estos registros se borran automáticamente al cabo de
          un día.
        </p>
        <p>
          Los datos viajan cifrados (HTTPS) y se guardan en Supabase, nuestro proveedor de base de
          datos. No se venden ni se comparten con nadie más.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>2. Lo que se queda en tu teléfono</h2>
        <h3 className={styles.h3}>Conexión entre teléfonos</h3>
        <p>
          El teléfono del puente y los de la tripulación se comunican directamente por la red Wi-Fi
          del barco. Esos mensajes nunca salen de esa red ni llegan a nuestros servidores.
        </p>
        <h3 className={styles.h3}>Ubicación</h3>
        <p>
          En iOS, la app usa el permiso de ubicación solo para seguir funcionando con la pantalla
          apagada, de modo que la alarma suene a tiempo. La ubicación no se guarda ni se envía a
          ningún sitio.
        </p>
        <h3 className={styles.h3}>Ajustes</h3>
        <p>
          La fecha de caducidad de la licencia, el intervalo de guardia y tus ajustes se guardan en
          el teléfono y se borran al desinstalar la app.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>3. Menores</h2>
        <p>La app está pensada para tripulaciones adultas y no recoge datos de menores.</p>
      </section>

      <section>
        <h2 className={styles.h2}>4. Tus derechos</h2>
        <p>
          Puedes pedir que borremos la licencia y el identificador de tu dispositivo escribiendo a{' '}
          <a className={styles.link} href="mailto:pasebarona@gmail.com">
            pasebarona@gmail.com
          </a>
          . Desinstalar la app borra todo lo que guardó en el teléfono.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>5. Cambios</h2>
        <p>
          Si cambia la forma en que la app trata los datos, esta página cambiará con ella y se
          actualizará la fecha de arriba.
        </p>
      </section>
    </DocPage>
  );
}
