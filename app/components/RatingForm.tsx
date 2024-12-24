import { useForm } from 'react-hook-form'
import { Rate, Button, Input, App } from 'antd'
import { useState } from 'react'

const { TextArea } = Input

interface RatingFormData {
  rating: number
  comment: string
}

interface RatingFormProps {
  mediaType: 'movie' | 'tv'
  mediaId: number
  title: string
}

export function RatingForm({ mediaType, mediaId, title }: RatingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comment, setComment] = useState('')
  const { message } = App.useApp()
  const { handleSubmit, setValue, watch } = useForm<RatingFormData>({
    defaultValues: {
      rating: 0,
      comment: '',
    }
  })

  const rating = watch('rating')

  const onSubmit = async (data: RatingFormData) => {
    setIsSubmitting(true)
    try {
      // Aqui você implementaria a lógica para salvar a avaliação
      console.log('Avaliação enviada:', {
        mediaType,
        mediaId,
        rating: data.rating,
        comment,
      })
      message.success('Avaliação enviada com sucesso!')
      setValue('rating', 0)
      setComment('')
    } catch (error) {
      message.error('Erro ao enviar avaliação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold mb-2">Avaliar {mediaType === 'movie' ? 'Filme' : 'Série'}</h3>
        <p className="text-gray-400 text-base mb-6">{title}</p>
      </div>

      <div className="space-y-2">
        <label className="block text-base text-gray-300">Sua nota</label>
        <div className="flex items-center gap-4">
          <Rate 
            allowHalf
            value={rating}
            onChange={(value) => setValue('rating', value)}
            className="text-2xl [&_.ant-rate-star]:!text-zinc-600 [&_.ant-rate-star-full_.ant-rate-star-second]:!text-yellow-400 [&_.ant-rate-star-half_.ant-rate-star-first]:!text-yellow-400 hover:[&_.ant-rate-star-second]:!text-yellow-400 hover:[&_.ant-rate-star-first]:!text-yellow-400"
          />
          {rating > 0 && (
            <span className="text-lg font-semibold text-yellow-400">
              {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-base text-gray-300">Comentário (opcional)</label>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Conte o que você achou..."
          className="!bg-white !text-black placeholder:text-gray-400 border-zinc-300 hover:border-red-600 focus:border-red-600 [&.ant-input:focus]:shadow-none [&.ant-input:hover]:border-red-600"
        />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        disabled={!rating}
        className="!bg-red-600 hover:!bg-red-700 border-none w-full"
      >
        Enviar Avaliação
      </Button>
    </form>
  )
} 