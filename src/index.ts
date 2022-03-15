import { ILabShell, JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IThemeManager } from '@jupyterlab/apputils';
import { LabIcon, jupyterFaviconIcon, jupyterIcon, jupyterlabWordmarkIcon } from '@jupyterlab/ui-components';
import { Widget } from '@lumino/widgets';

/**
 * A g2nb theme and logo replacement for JupyterLab
 */
const plugin: JupyterFrontEndPlugin<void> = {
    id: '@g2nb/jupyterlab-theme:plugin',
    requires: [IThemeManager, ILabShell],
    activate: (app: JupyterFrontEnd, manager: IThemeManager, shell: ILabShell) => {
        const style = '@g2nb/jupyterlab-theme/index.css';

        // Create the g2nb logo
        const g2nb_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 68.16 74.4"><image width="284" height="310" transform="scale(0.24)" xlink:href="data:image/png;base64,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OJLSWDiS0lg4ktJYOJLSWDiS0lg4ktJYOJLSWDiS0lg4ktJYOJLSWDiS0lg4ktJYOJLSWDiS0uxSC/TgSOBXtZCkhXA4cHItNK2Mwvl+KeXSWkjS/EXEvrVMF76lkpTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUxsKRlMbCkZTGwpGUZgkotZAk9WEJuLkW6ihqAUkLY5bverYuATfUUh1trAUkLYxZ/r3esgRsqaU62qsWkLQw7lULdHDTEvDzWqqjA2sBSQtj/1qgg+uWgJ/UUh0dXAtIWhiH1AIdXLMEfL+W6ugJtYCk+YuIXYDDarkOrlwqpVwNXF1LdvDIiJjl+0JJ/XgKsKEW6uDS5Y/ALpkY62YD8Pu1kKS5e14t0NEvlgtn88RYdy+PiHW1kKT5GLwLmfXCYPNy4Vw4MdbdI4CjaiFJc/Mq4G61UEfbCuf8ibF+vCMidq2FJOWKiAOBV9dyHV1ZSrkss3AOBf6sFpKU7u+ATbVQR+fD7edNXAD83/hsb06IiKfXQpJyRMQJwO/Wcj34NgwKp5RyE/C9ifF+7Ap8OiIOqgUlzVZEvBj4G3JOsD4Ptj8z9Ctjgn3bAPxnRBwTEbM8M1XSCBGxa0ScBHyglu1JAc4FiFKay+FExKEMlj2JfgicCpxRSpn1KRbSmhURQXOa0XOBl5N7UvW5pZTHwVDhAETEpcz2bNFJvgecRXMy6ayv0SOtBQHcA3gw8ETgfpPjM/OOUspJsGPhfAh42bhnSdIUHltK+TrseHWvfx0RlqRpXb5cNrBj4ZwNXIEk9eP04f/YrnBKKTcAn0aS+jG+cAb+Ae/kIKm7HwBfG/7CDoVTSjmPnIMAJe3cPlJK2Tr8hXEH3p0y5uuS1MY1wMdWfnFc4Xwcdx5Lmt4nSymXr/ziyMIppdwGvHPUY5JUcSPwnlEPbHfg33YPRKwHfklzpKIktfXxUsqxox4Ye/JkKeUW4KRxj0vSCNcDbx/34MSztUsp7wd+PCkjSUM+WEoZe8nisW+ptgUijgA+D+wyMShprbsEeFQpZewHTtXr0ZRSvgicVstJWvPeMKlsoMUKByAi9gH+m9ned1jSHdcZwLNXHui3UqvCAYiII4H/qOUkrTnXAfuVUq6qBatvqZaVUs4C3lXLSVpTbgaObVM2sIrCASilnACciCd3SoJfA0eXUj5TCy5r/ZZqWET8IzDywB5Ja8YrSimn1kLDVrXCGXI88KlaSNJOaSvNwX1/XwuuNNUKB7ZdBf4c4Em1rKSdysmllNfVQqNMu8KhNE31LDxGR1orbgPeAby+Fhxn6hXOsIh4L/CqWk7SHdorSymdbp439QpnhdfS7Nf5VS0o6Q7nJ8BzupYN9LTCWRYR+wNfYn433JLUr+8CTy6lXFMLttHXCgeAUspPgUOBt+IVA6U7sp8BrwMe31fZQM8rnGERsYlmh/JRtaykhXI68NLS3DaqVzMrHNj20fnhwPOAo4F9Jj9D0pz8jOaedP9Uhu6U2beZFs6wiFiiOTr5ROD+lbikHBcCbwJOLwllkFY4ywarngcDhwC/CRwA3Ifm2sm7AeuBdWNfQFJbhebYmVtpLv25Bfg5zadOPwC+A/w4o2iW/T8UeEdX2WTK+gAAAABJRU5ErkJggg=="/><image width="112" height="172" transform="translate(20.64 23.28) scale(0.24)" xlink:href="data:image/png;base64,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"/></svg>';
        const g2nb_icon = new LabIcon({ name: 'ui-components:g2nb', svgstr: g2nb_svg });

        // Attach the g2nb logo in the top left
        const logo = new Widget();
        g2nb_icon.element({
            container: logo.node,
            elementPosition: 'center',
            margin: '2px 2px 2px 8px',
            height: 'auto',
            width: '16px'
        });
        logo.id = 'jp-g2nbLogo';
        shell.add(logo, 'top', { rank: 0 });

        // Set the icons elsewhere
        jupyterFaviconIcon.svgstr = g2nb_svg;
        jupyterIcon.svgstr = g2nb_svg;
        jupyterlabWordmarkIcon.svgstr = g2nb_svg;

        // Register the plugin
        manager.register({
            name: 'g2nb',
            isLight: true,
            themeScrollbars: true,
            load: () => manager.loadCSS(style),
            unload: () => Promise.resolve(undefined)
        });
    },
    autoStart: true
};

export default plugin;
