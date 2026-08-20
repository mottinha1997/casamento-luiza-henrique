// Componente de código para o Framer.
// Insert → Code → New Component → cole este arquivo.
// Depois arraste-o para a página e deixe em Fill × Fill.
//
// Hospede o casamento.html em qualquer lugar (Vercel, Netlify, GitHub Pages,
// Cloudflare Pages) e cole a URL na propriedade "Fonte" no painel direito.

import { addPropertyControls, ControlType } from "framer"
import type { CSSProperties } from "react"

interface Props {
    src: string
    style?: CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 * @framerDisableUnlink
 */
export default function ConviteEmbed({ src, style }: Props) {
    return (
        <iframe
            src={src}
            title="Convite de casamento"
            // autoplay: sem isso a trilha só começa no primeiro clique do visitante
            allow="autoplay; clipboard-write"
            style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
                background: "#F7F1E6",
                ...style,
            }}
        />
    )
}

ConviteEmbed.defaultProps = {
    src: "https://seu-dominio.com/casamento.html",
}

addPropertyControls(ConviteEmbed, {
    src: {
        type: ControlType.String,
        title: "Fonte",
        placeholder: "https://…/casamento.html",
    },
})
