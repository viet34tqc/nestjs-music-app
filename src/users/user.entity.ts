import { Exclude } from 'class-transformer';
import { PlaylistEntity } from 'src/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  // Exclude password from the response
  // Need @UseInterceptors(ClassSerializerInterceptor) in the controller
  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  apiKey: string;

  @Column()
  phone: string;

  // (playlist) => playlist.user is inverse side
  // This is crucial for TypeORM to understand how the two entities relate to each other
  // Here, it indicates that each playlist instance has a property called user
  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[];
}
