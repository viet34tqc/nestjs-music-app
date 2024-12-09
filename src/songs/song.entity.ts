import { ArtistEntity } from 'src/artists/artist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics: string;

  @ManyToMany(() => ArtistEntity, (artist) => artist.songs, { cascade: true }) // cascade can be boolean | insert | update
  @JoinTable({ name: 'songs_artists' }) // This is mandatory in many to many relationship of TypeOrm
  artists: ArtistEntity[];
}
